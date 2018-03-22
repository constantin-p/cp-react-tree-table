// @flow
import React, { Component } from 'react';
import type { ChildrenArray, Element } from 'react';

import Column from './Column';
import VirtualList from './VirtualList';

import BTRoot from '../model/bt_root';
import Row from '../model/row';

import { processData } from '../util';


type Props = {
  data: Array<any>,
  children: ChildrenArray<Element<typeof Column>>,

  height: ?number,
  className?: string,
};

type State = {
  root: BTRoot,
};

export default class TreeDataTable extends Component<Props, State> {
  static Column = Column;

  constructor(props: Props) {
    super(props);

    this.state = {
      root: new BTRoot(processData(this.props.data))
    };
  }

  render() {
    const { height, children, className } = this.props;

    const baseClass = className ? `cp_tree-table ${className}`: 'cp_tree-table';
    return (
      <VirtualList className={baseClass}
        columns={children}

        height={height || 200}
        root={this.state.root}
        onToggle={(row) => this.handleOnToggle(row)}/>
    );
  }

  handleOnToggle = (row: Row) => {
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
        if (hasChange) {
          this.setState({ root: root });
        }
        return true;
      }
    });

  }
}
