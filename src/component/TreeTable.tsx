import React, { Component, Children, createRef } from 'react';
import Column, { ColumnProps } from './Column';
import TreeTableHeader from './TreeTableHeader';
import VirtualList from './VirtualList';
import TreeState from '../model/tree-state';


export type TreeTableProps = {
  // Model properties
  value: Readonly<TreeState>;
  onChange?: (value: Readonly<TreeState>) => void;

  // TODO: watch https://github.com/microsoft/TypeScript/issues/21699
  // and move to 'required' when possible 
  // children: Array<React.ReactElement<ColumnProps>>;
  children?: Array<React.ReactElement<Column>> | React.ReactElement<Column>;

  // View callbacks
  onScroll?: (scrollTop: number) => void,

  // View properties
  height?: number; // view height (px)
  headerHeight?: number; // header height (px)
  className?: string;
}

const TABLE_DEFAULT_HEIGHT = 260;
const noopOnChange = (value: Readonly<TreeState>) => {}
const noopOnScroll = (scrollTop: number) => {}
export default class TreeTable extends Component<TreeTableProps, {}> {
  static Column = Column;
  private vListRef = createRef<VirtualList>();

  render() {
    const { value, children, onChange, onScroll,
      height, headerHeight, className } = this.props;

    const columnsDef: Array<ColumnProps> = [];
    Children
      .toArray(children)
      .forEach((node: React.ReactNode) => {
        if (isColumnElement(node)) {
          columnsDef.push(node.props);
        }
      });

    return (
      <div className={`cp_tree-table ${className != null && className}`}>
        <TreeTableHeader columns={columnsDef} height={headerHeight}/>
        { value.hasData && <VirtualList data={value} columns={columnsDef}
          height={Number(height) || TABLE_DEFAULT_HEIGHT}
          onChange={onChange || noopOnChange}
          ref={this.vListRef}
          onScroll={onScroll || noopOnScroll} /> }
      </div>
    );
  }

  private handleChange = (value: Readonly<TreeState>): void => {
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


const isColumnElement = (elem: any): elem is React.ReactElement<ColumnProps> => {
  return checkElementType(elem, Column);
}

const checkElementType = <T extends {}>(elem: any, cmpType: React.ComponentType<T>): elem is React.ReactElement<T> => {
  return (
    elem != null &&
    elem.type != null &&
    elem.type.displayName != null &&
    elem.type.displayName === cmpType.displayName
  );
}
