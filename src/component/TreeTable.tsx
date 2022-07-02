import React, { Component, Children, createRef } from 'react';
import Column, { ColumnProps } from './Column';
import TreeTableHeader from './TreeTableHeader';
import VirtualList from './VirtualList';
import TreeState from '../model/tree-state';


export type TreeTableProps<TData> = {
  // Model properties
  value: Readonly<TreeState<TData>>;
  onChange?: (value: Readonly<TreeState<TData>>) => void;

  // TODO: watch https://github.com/microsoft/TypeScript/issues/21699
  // and move to 'required' when possible 
  // children: Array<React.ReactElement<ColumnProps>>;
  children?: Array<React.ReactElement<Column<TData>>> | React.ReactElement<Column<TData>>;

  // View callbacks
  onScroll?: (scrollTop: number) => void,

  // View properties
  height?: number; // view height (px)
  headerHeight?: number; // header height (px)
  className?: string;
}

const TABLE_DEFAULT_HEIGHT = 260;
const noopOnChange = (value: Readonly<TreeState<unknown>>) => {}
const noopOnScroll = (scrollTop: number) => {}
export default class TreeTable<TData> extends Component<TreeTableProps<TData>, {}> {
  static Column = Column;
  private vListRef = createRef<VirtualList<TData>>();

  render() {
    const { value, children, onScroll,
      height, headerHeight, className } = this.props;

    const columnsDef: Array<ColumnProps<TData>> = [];
    Children
      .toArray(children)
      .forEach((node: React.ReactNode) => {
        if (isColumnElement<TData>(node)) {
          columnsDef.push(node.props);
        }
      });

    return (
      <div className={`cp_tree-table ${className != null && className}`}>
        <TreeTableHeader columns={columnsDef} height={headerHeight}/>
        { value.hasData && <VirtualList data={value} columns={columnsDef}
          height={Number(height) || TABLE_DEFAULT_HEIGHT}
          onChange={this.handleChange}
          ref={this.vListRef}
          onScroll={onScroll || noopOnScroll} /> }
      </div>
    );
  }

  private handleChange = (value: Readonly<TreeState<TData>>): void => {
    const { onChange } = this.props;
    (onChange || noopOnChange)(value);
  }

  // Public API
  scrollTo(posY: number): void {
    if (this.vListRef.current != null) {
      this.vListRef.current.scrollTo(posY);
    }
  }
}


function isColumnElement<TData>(elem: any): elem is React.ReactElement<ColumnProps<TData>> {
  return checkElementType(elem, Column);
}

function checkElementType<T extends {}>(elem: any, cmpType: React.ComponentType<T>): elem is React.ReactElement<T> {
  return (
    elem != null &&
    elem.type != null &&
    elem.type.displayName != null &&
    elem.type.displayName === cmpType.displayName
  );
}
