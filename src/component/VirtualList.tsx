import React, { Component, CSSProperties } from 'react';
import VirtualListRow from './VirtualListRow';
import { ColumnProps } from './Column';
import TreeState from '../model/tree-state';
import TreeRow from '../model/tree-row';
import Row from '../model/row';


type Props = {
  data: Readonly<TreeState>;
  columns: Array<ColumnProps>;

  onChange: (value: Readonly<TreeState>) => void;
}

type State = {
  height: number,
  topOffset: number,
  overscanHeight: number,
}

export default class VirtualList extends Component<Props, State> {
  state = {
    height: 200,
    topOffset: 0,
    overscanHeight: 100,
  };

  private containerRef = React.createRef<HTMLDivElement>();

  render() {
    const { data, columns, onChange } = this.props;
    const { height, topOffset, overscanHeight } = this.state;

    const startYMax = Math.max(0, data.height - height - (overscanHeight * 2));
    const startY = Math.min(startYMax, Math.max(0, topOffset - overscanHeight));
    let startIndex = data.indexAtYPos(startY);

    const endY = Math.min(data.height, topOffset + height + overscanHeight);
    let endIndex = data.indexAtYPos(endY);

    const contentTopOffset = data.yPosAtIndex(startIndex);

    let visibleRowsData: Array<Row> = [], lastVisibleRowIndex;
    TreeState.sliceRows(data, startIndex, endIndex).forEach((row: Row) => {
      if (row.$state.isVisible) {
        visibleRowsData.push(row);
      }
    });

    const visibleVLRows = visibleRowsData.map((row: Row, relIndex: number) => {

      return (
        <VirtualListRow key={relIndex}
          data={data}
          row={row}
          columns={columns}
          onChange={onChange}

          index={row.metadata.index}
          relIndex={relIndex} />
      );
    });

    return (
      <div className="cp_tree-table_viewport"
        style={{ ...STYLE_LIST, height: `${height}px` }}
        ref={this.containerRef}
        onScroll={this.handleScroll}>

        <div style={{ ...STYLE_WRAPPER, height: `${data.height}px` }}>
          <div style={{ ...STYLE_CONTENT, top: `${contentTopOffset}px` }}
            className="cp_tree-table_mover">
            {visibleVLRows}
          </div>
        </div>

      </div>
    );
  }

  private handleScroll = () => {
    if (this.containerRef.current != null) {
      const { scrollTop } = this.containerRef.current;

      this.setState({
        topOffset: scrollTop,
      });
    }
  }
}

const STYLE_LIST: CSSProperties = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
};

const STYLE_WRAPPER: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: '100%',
};

const STYLE_CONTENT: CSSProperties = {
  position: 'absolute',
  overflow: 'visible',
  height: '100%',
  width: '100%',
  top: '0',
  left: '0',
};
