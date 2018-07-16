// @flow
import React, { Component } from 'react';
import type { ChildrenArray, Element } from 'react';

import Column from './Column';
import VirtualList from './VirtualList';

import BTRoot from '../model/bt_root';
import Row from '../model/row';
import type { TreeDataRow  } from '../model/row';

import { processData, noop, findNodeData } from '../util';



type Props = {
  data: Array<TreeDataRow>,
  children: ChildrenArray<Element<typeof Column>>,

  height?: number,
  rowHeight?: number,
  onScroll?: (scrollTop: number) => void,
  className?: string,
};

type State = {
  root: BTRoot,
};

export default class TreeDataTable extends Component<Props, State> {
  static Column = Column;

  virtualList: ?VirtualList;

  constructor(props: Props) {
    super(props);
    const { rowHeight } = props;

    this.state = {
      root: new BTRoot(processData(this.props.data, rowHeight)),
    };
  }

  render() {
    const { height, children, onScroll, className } = this.props;

    const baseClass = className ? `cp_tree-table ${className}`: 'cp_tree-table';
    return (
      <VirtualList className={baseClass}
        ref={elem => {this.virtualList = elem}}

        columns={children}

        height={height || 200}
        root={this.state.root}
        
        onScroll={onScroll || noop}
        onToggle={(row) => this._handleOnToggle(row)}/>
    );
  }

  // Public API
  scrollIntoView(node: TreeDataRow, expandAncestors: boolean = true) {
    const { root } = this.state;

    const row = findNodeData(root, node);
    if (row) {
      const rowIndex = root.getRowIndex(row);
      if (expandAncestors && !row.isVisible()) {
        let ancestors: Array<Row> = [];
        for (let currentRowIndex = Math.max(rowIndex - 1, 0), previousDepth = row.depth; currentRowIndex >= 0; currentRowIndex--) {
          const currentRow = root.getRow(currentRowIndex);
          
          if (currentRow.depth === previousDepth - 1) {  // Parent
            ancestors.push(currentRow);
            previousDepth = currentRow.depth;

            if (currentRow.isVisible()) { // From here up, all the ancestors are visible
              break;
            }
          }

          if (currentRow.depth === 0) {
            break;
          }
        }

        ancestors.forEach((row: Row) => this._handleOnToggle(row));
      }

      const posY = root.getYAtIndex(rowIndex);
      this.scrollTo(posY);
    }
  }

  // Public API
  scrollTo(posY: number) {
    if (this.virtualList) {
      this.virtualList.scrollTop(posY);
    }
  }

  _handleOnToggle = (row: Row) => {
    const { root } = this.state;
    const currentDepth = row.depth;
    let rowIndex = Math.min(root.getRowIndex(row) + 1, root.getSize());

    let hasChange: boolean = false;
    let toggleOpen: ?boolean;
    root.mapRange(rowIndex, root.getSize() - rowIndex, (row: Row) => {
      if (toggleOpen == null) {
        toggleOpen = !row.isVisible();
      }

      if (row.depth >= currentDepth + 1) {
        if (row.depth === currentDepth + 1) {
          row.toggle();
          hasChange = true;
        } else if (!toggleOpen && row.isVisible()) { // Close all children
          row.toggle();
          hasChange = true;
        }
        
        return false;
      } else {
        return true;
      }
    });
    if (hasChange) {
      this.setState({ root: root });
    }
  }
}
