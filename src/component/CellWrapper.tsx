import React, { Component, CSSProperties } from 'react';
import TreeRow from '../model/tree-row';


type Props = {
  row: TreeRow;
  renderCell: (row: TreeRow) => Node;

  grow?: number;
  basis?: string; // <CSS size> | auto
}

type State = { }

export default class CellWrapper extends Component<Props, State> {
  static defaultProps = {
    grow: 1,
    basis: 'auto',
  };


  render() {
    const { row, renderCell, grow, basis } = this.props;

    return (
      <div className={`cp_tree-table_cell`}
        style={{ ...STYLE_COLUMN, flexGrow: grow, flexBasis: basis }}>
        { renderCell(row) }
      </div>
    );
  }
}


const STYLE_COLUMN: CSSProperties = {
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
};