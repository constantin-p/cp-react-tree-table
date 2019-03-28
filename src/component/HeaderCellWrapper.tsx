import React, { Component, CSSProperties } from 'react';


type Props = {
  renderHeaderCell: () => Node;

  grow?: number;
  basis?: string; // <CSS size> | auto
}

type State = { }

export default class HeaderCellWrapper extends Component<Props, State> {
  static defaultProps = {
    grow: 1,
    basis: 'auto',
  };

  render() {
    const { renderHeaderCell, grow, basis } = this.props;

    return (
      <div className={`cp_tree-table_header-cell`}
        style={{ ...STYLE_COLUMN, flexGrow: grow, flexBasis: basis }}>
        { renderHeaderCell() }
      </div>
    );
  }
}


const STYLE_COLUMN: CSSProperties = {
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
};