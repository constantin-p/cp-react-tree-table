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

  // View properties
  height?: number; // view height (px)
  rowHeight?: number; // row height (px)
  headerHeight?: number; // header height (px)
  className?: string;
}

type State = { }

const noopOnChange = (value: Readonly<TreeState>) => {}
export default class TreeTable extends Component<Props, State> {
  static Column = Column;
  
  render() {
    const { value, children, onChange,
      headerHeight, className } = this.props;

    const columnsDef = Children.toArray(children).map((child: React.ReactElement<Column>) => {
      return (child.props as unknown) as ColumnProps;
    });

    return (
      <div className={`cp_tree-table ${className != null && className}`}>
        <TreeTableHeader columns={columnsDef} height={headerHeight}/>
        { value.hasData && <VirtualList data={value} columns={columnsDef} onChange={onChange || noopOnChange}/> }
      </div>
    );
  }
}