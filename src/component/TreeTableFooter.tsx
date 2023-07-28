import React, { Component, CSSProperties } from 'react';
import { ColumnProps } from './Column';
import FooterCellWrapper from './FooterCellWrapper';


export type TreeTableFooterProps<TData> = {
  columns: Array<ColumnProps<TData>>;
  height?: number;
}

export default class TreeTableFooter<TData> extends Component<TreeTableFooterProps<TData>, {}> {
  static defaultProps = {
    height: 26,
  };

  render() {
    const { columns, height } = this.props;


    return (
      <div className="cp_tree-footer"
        style={{ ...STYLE_ROW, height: `${height}px` }}>
        {columns.map((column: ColumnProps<TData>, indexKey) => {
          return (
            <FooterCellWrapper key={indexKey}
              renderFooterCell={column.renderFooterCell} 

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
  overflow: 'visible',
  width: '100%',
};
