import React, { Component } from 'react';
import Row from '../model/row';


export type ColumnProps = {
  renderCell: (row: Row) => Node;
  renderHeaderCell: () => Node;

  grow?: number;
  basis?: string; // <CSS size> | auto
}

export default class Column extends Component<ColumnProps, {}> {
  
  render() {
    return null;
  }
}