import React, { Component, CSSProperties } from 'react';


export type HeaderCellWrapperProps = {
  renderHeaderCell: () => React.ReactNode;

  grow?: number;
  basis?: string; // <CSS size> | auto
}

export default class HeaderCellWrapper extends Component<HeaderCellWrapperProps, {}> {
  static defaultProps = {
    grow: 1,
    basis: '0px',
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
  width: '100%',
};
