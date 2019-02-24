import React, { Component, Children, CSSProperties } from 'react';
import Column, { ColumnProps } from './Column';
import CellWrapper from './CellWrapper';
import TreeState from '../model/tree-state';
import TreeRow from '../model/tree-row';
import Row from '../model/row';


type Props = {
  data: Readonly<TreeState>;
  row: Row;
  columns: Array<ColumnProps>;

  onChange: (value: Readonly<TreeState>) => void;

  index: number;
  relIndex: number;
}

type State = { }

export default class VirtualListRow extends Component<Props, State> {
  
  render() {
    const { row, columns, data, index, relIndex } = this.props;
    const treeRow = new TreeRow(row, data, this.handleChange);

    return (
      <div className={`cp_tree-table_row`}
        style={{ ...STYLE_ROW, height: `${row.metadata.height}px` }}
        data-index={index}
        data-relindex={relIndex}>
        
        {columns.map((column: ColumnProps, indexKey) => {
          return (
            <CellWrapper key={indexKey}
              row={treeRow}
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