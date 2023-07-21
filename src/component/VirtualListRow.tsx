import React, { Component, CSSProperties } from 'react';
import { ColumnProps } from './Column';
import CellWrapper from './CellWrapper';
import TreeState from '../model/tree-state';
import Row, { RowModel } from '../model/row';
import { createRow } from '../util/row-creator';


export type VirtualListRowProps<TData> = {
  data: Readonly<TreeState<TData>>;
  model: RowModel<TData>;
  columns: Array<ColumnProps<TData>>;

  onChange: (value: Readonly<TreeState<TData>>) => void;

  index: number;
  relIndex: number;
}

export default class VirtualListRow<TData> extends Component<VirtualListRowProps<TData>, {}> {
  
  render() {
    const { model, columns, data, index, relIndex } = this.props;
    const row: Row<TData> = createRow<TData>(model, data, this.handleChange);
    // @ts-ignore
    const rowClass = row.data[0].rowClass;

    return (
      <div className={`cp_tree-table_row${rowClass ? ' ' + rowClass : ''}`}
        style={{ ...STYLE_ROW, height: `${row.metadata.height}px` }}
        data-index={index}
        data-relindex={relIndex}>
        
        {columns.map((column: ColumnProps<TData>, indexKey) => {
          return (
            <CellWrapper key={indexKey}
              row={row}
              renderCell={column.renderCell} 

              grow={column.grow}
              basis={column.basis}/>
          );
        })}

      </div>
    );
  }

  private handleChange = (value: Readonly<TreeState<TData>>): void => {
    const { onChange } = this.props;
    onChange(value);
  }
}


const STYLE_ROW: CSSProperties = {
  display: 'flex',

  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'visible',
  width: '100%',
};
