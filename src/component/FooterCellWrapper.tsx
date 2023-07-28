import React, { Component, CSSProperties } from 'react';


export type FooterCellWrapperProps = {
  renderFooterCell: () => React.ReactNode;

  grow?: number;
  basis?: string; // <CSS size> | auto
}

export default class FooterCellWrapper extends Component<FooterCellWrapperProps, {}> {
  static defaultProps = {
    grow: 1,
    basis: '0px',
  };

  render() {
    const { renderFooterCell, grow, basis } = this.props;

    return (
      <div className={`cp_tree-table_footer-cell`}
        style={{ ...STYLE_COLUMN, flexGrow: grow, flexBasis: basis }}>
        { renderFooterCell() }
      </div>
    );
  }
}


const STYLE_COLUMN: CSSProperties = {
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'visible',
  width: '100%',
};
