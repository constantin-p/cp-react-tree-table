import React, { Component } from 'react';
import Row from '../model/row';


export type ColumnProps<TData> = {
  renderCell: (row: Row<TData>) => React.ReactNode;
  renderHeaderCell: () => React.ReactNode;
  renderFooterCell: () => React.ReactNode;


  grow?: number;
  basis?: string; // <CSS size> | auto
}

export default class Column<TData> extends Component<ColumnProps<TData>, {}> {
  static displayName: string = 'TreeTable.Column'; // NOTE: Used to filter TreeTable children props

  render() {
    return null;
  }
}
