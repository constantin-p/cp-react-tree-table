// @flow
import React, { Component, Children } from 'react';
import type { ChildrenArray, Element } from 'react';

import Column from './Column';
import ColumnWrapper from './ColumnWrapper';


type Props = {
  row: any,
  columns: ChildrenArray<Element<typeof Column>>,

  index: number,
  onToggle: () => void,
};

type State = {
  overscanHeight: number,
  height: number,
  topOffset: number,
};

export default class VirtualListRow extends Component<Props, State> {

  state = {
    overscanHeight: 100,
    height: 0,
    topOffset: 0,
  };

  render() {
    const { row, index, onToggle, columns } = this.props;

    return (
      <div className="cp_tree-table_row"
        style={{ ...STYLE_ROW, height: row.getHeight() + 'px' }}
        data-rindex={index}
        data-depth={row.depth} >
      
        {Children.toArray(columns).map((column, index) => {
          return (
            <ColumnWrapper key={index}
              {...column.props}

              rowData={row.data}
              toggle={onToggle}
              rowMetadata={row.getMetadata()}/>
          );
        })}
      </div>
    );
  }
}

const STYLE_ROW = {
  display: 'flex',

  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
};
