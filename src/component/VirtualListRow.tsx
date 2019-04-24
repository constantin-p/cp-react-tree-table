import React, { Component, Children, CSSProperties } from 'react';
import Column, { ColumnProps } from './Column';
import CellWrapper from './CellWrapper';
import TreeState from '../model/tree-state';
import Row, { RowModel } from '../model/row';
import { createRow } from '../util/row-creator';


type Props = {
  data: Readonly<TreeState>;
  model: RowModel;
  columns: Array<ColumnProps>;

  onChange: (value: Readonly<TreeState>) => void;

  index: number;
  relIndex: number;
}

type State = { }

export default class VirtualListRow extends Component<Props, State> {
  
  render() {
    const { model, columns, data, index, relIndex } = this.props;
    const row: Row = createRow(model, data, this.handleChange);

    return (
      <div className={`cp_tree-table_row`}
        style={{ ...STYLE_ROW, height: `${row.metadata.height}px` }}
        data-index={index}
        data-relindex={relIndex}>
        
        {columns.map((column: ColumnProps, indexKey) => {
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

  private handleChange = (value: Readonly<TreeState>): void => {
    const { onChange } = this.props;
    onChange(value);
  }
}


const STYLE_ROW: CSSProperties = {
  display: 'flex',

  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
};
