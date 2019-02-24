import React, { Component } from 'react';
import TreeRow from '../model/tree-row';


export type ColumnProps = {
  renderCell: (row: TreeRow) => Node;
  renderHeaderCell: () => Node;

  grow?: number;
  basis?: string; // <CSS size> | auto
}

export default class Column extends Component<ColumnProps, {}> {
  
  render() {
    return null;
  }
}