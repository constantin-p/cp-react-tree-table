import React, { Component, CSSProperties } from 'react';
import VirtualListRow from './VirtualListRow';
import { ColumnProps } from './Column';
import TreeState from '../model/tree-state';
import { RowModel } from '../model/row';


type Props = {
  data: Readonly<TreeState>;
  columns: Array<ColumnProps>;

  height: number;

  onChange: (value: Readonly<TreeState>) => void;
  onScroll: (scrollTop: number) => void;
}

type State = {
  topOffset: number,
  overscanHeight: number,
}

export default class VirtualList extends Component<Props, State> {
  state = {
    topOffset: 0,
    overscanHeight: 100,
  };

  private containerRef = React.createRef<HTMLDivElement>();

  render() {
    const { data, columns, height, onChange } = this.props;
    const { topOffset, overscanHeight } = this.state;

    const startYMax = Math.max(0, data.height - height - (overscanHeight * 2));
    const startY = Math.min(startYMax, Math.max(0, topOffset - overscanHeight));
    let startIndex = data.indexAtYPos(startY);

    const endY = Math.min(data.height, topOffset + height + overscanHeight);
    let endIndex = data.indexAtYPos(endY);

    const contentTopOffset = data.yPosAtIndex(startIndex);

    let visibleRowsData: Array<RowModel> = [], lastVisibleRowIndex;
    TreeState.sliceRows(data, startIndex, endIndex).forEach((rowModel: RowModel) => {
      if (rowModel.$state.isVisible) {
        visibleRowsData.push(rowModel);
      }
    });

    const visibleVLRows = visibleRowsData.map((rowModel: RowModel, relIndex: number) => {

      return (
        <VirtualListRow key={relIndex}
          data={data}
          model={rowModel}
          columns={columns}
          onChange={onChange}

          index={rowModel.metadata.index}
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
      const { onScroll } = this.props;

      onScroll(scrollTop);
      this.setState({
        topOffset: scrollTop,
      });
    }
  }

  scrollTo = (posY: number) => {
    if (this.containerRef.current != null) {
      this.containerRef.current.scrollTop = posY;
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
