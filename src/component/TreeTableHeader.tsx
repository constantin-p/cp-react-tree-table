import React, { Component, CSSProperties } from 'react';
import HeaderCellWrapper from './HeaderCellWrapper';
import { ColumnProps } from './Column';


export type TreeTableHeaderProps<TData> = {
  columns: Array<ColumnProps<TData>>;
  height?: number;
}

export default class TreeTableHeader<TData> extends Component<TreeTableHeaderProps<TData>, {}> {
  static defaultProps = {
    height: 26,
  };

  render() {
    const { columns, height } = this.props;


    return (
      <div className="cp_tree-table_header"
        style={{ ...STYLE_ROW, height: `${height}px` }}>
        {columns.map((column: ColumnProps<TData>, indexKey) => {
          return (
            <HeaderCellWrapper key={indexKey}
              renderHeaderCell={column.renderHeaderCell} 

              grow={column.grow}
              basis={column.basis}/>
          );
        })}
      </div>
    );
  }
}


const STYLE_ROW: CSSProperties = {
  display: 'flex',

  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
};
