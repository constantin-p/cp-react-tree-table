import React, { Component, Children } from 'react';
import Column, { ColumnProps } from './Column';
import TreeTableHeader from './TreeTableHeader';
import VirtualList from './VirtualList';
import TreeState from '../model/tree-state';


type Props = {
  // Model properties
  value: Readonly<TreeState>;
  onChange?: (value: Readonly<TreeState>) => void;

  children: Array<React.ReactElement<Column>>;

  // View callbacks
  onScroll?: (scrollTop: number) => void,

  // View properties
  height?: number; // view height (px)
  headerHeight?: number; // header height (px)
  className?: string;
}

type State = { }

const noopOnChange = (value: Readonly<TreeState>) => {}
const noopOnScroll = (scrollTop: number) => {}
export default class TreeTable extends Component<Props, State> {
  static Column = Column;
  private vListRef = React.createRef<VirtualList>();
  
  render() {
    const { value, children, onChange, onScroll,
      headerHeight, className } = this.props;

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
        { value.hasData && <VirtualList data={value} columns={columnsDef} onChange={onChange || noopOnChange}
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
