// @flow
import React, { Component } from 'react';
import type { ChildrenArray, Element } from 'react';

import Column from './Column';
import VirtualListRow from './VirtualListRow';

import BTRoot from '../model/bt_root';
import Row from '../model/row';

type Props = {
  root: BTRoot,
  columns: ChildrenArray<Element<typeof Column>>,
  height: number,
  onToggle: (row: Row) => void,
  className?: string,
};

type State = {
  overscanHeight: number,
  height: number,
  topOffset: number,
};

export default class VirtualList extends Component<Props, State> {

  state = {
    overscanHeight: 100,
    height: 0,
    topOffset: 0,
  };

  container: ?HTMLElement;

  componentDidUpdate() {
    this.setHeight();
  }

  componentDidMount() {
    this.setHeight();
    window.addEventListener("resize", this.setHeight.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setHeight.bind(this));
  }

  render() {
    const { root, columns, onToggle, className, onScroll } = this.props;
    const { overscanHeight, height, topOffset } = this.state;

    const startY =  Math.max(0, topOffset - overscanHeight);
    let startIndex = root.getIndexAtY(startY);

    const endY =  Math.min(root.getHeight(), topOffset + height + overscanHeight);
    let endIndex = root.getIndexAtY(endY);

    const contentTopOffset =  root.getYAtIndex(startIndex);

    let visibleRows = [], relativeIndex = 0;
    root.mapRange(startIndex, endIndex - startIndex, (row: Row) => {
      if (row.isVisible()) {
        visibleRows.push(
          <VirtualListRow
            row={row}
            columns={columns}
            index={relativeIndex}
            key={relativeIndex++}
            onToggle={() => onToggle(row)}/>
        );
      }
    });

    return (
      <div className={className}
        style={{ ...STYLE_LIST, height: this.props.height + 'px', }}
        ref={elem => {this.container = elem}}
        onScroll={this.handleScroll}>
        <div style={{ ...STYLE_WRAPPER, height: (root.getHeight()) + 'px', }}>
          <div style={{ ...STYLE_CONTENT, top: (contentTopOffset) + 'px' }}
            className="cp_tree-table_mover">
            {visibleRows}
          </div>
        </div>
      </div>
    );
  }


  // virtual scroll
  handleScroll = () => {
    const {onScroll} = this.props;

    if (this.container) {
      const { scrollTop } = this.container;

      if (onScroll) {
        onScroll(scrollTop)
      }

      this.setState({
        topOffset: scrollTop
      });
    }
  }

  // virtual scroll
  setHeight = () => {
    const { height } = this.state;
    
    if (this.container) {
      const { offsetHeight } = this.container;

      if (height !== offsetHeight) {
        this.setState({
          height: offsetHeight
        });
      }
    }
  };
}

const STYLE_LIST = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
};

const STYLE_WRAPPER = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: '100%',
};

const STYLE_CONTENT = {
  position: 'absolute',
  overflow: 'visible',
  height: '100%',
  width: '100%',
  top: '0',
  left: '0',
};
