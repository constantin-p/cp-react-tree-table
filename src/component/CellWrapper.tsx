import React, { Component, CSSProperties } from 'react';
import Row from '../model/row';


type Props = {
  row: Row;
  renderCell: (row: Row) => Node;

  grow?: number;
  basis?: string; // <CSS size> | auto
}

type State = { }

export default class CellWrapper extends Component<Props, State> {
  static defaultProps = {
    grow: 1,
    basis: '0px',
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
  width: '100%',
};
