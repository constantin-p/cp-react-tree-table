// @flow
import React, { Component } from 'react';

import TreeDataTable from 'cp-react-tree-table';
import type { RowMetadata } from 'cp-react-tree-table';

import { generateData } from './mockData';


type Props = { };
type State = { };

export default class DemoApp extends Component<Props, State> {
  render () {
    return (
      <div className="wrapper">
      
        <ul className="links">
          <li>
            <a href="https://github.com/constantin-p/cp-react-tree-table">
              <span className="service">GitHub</span>
              <span className="sep"></span>
              <span className="name">cp-react-tree-table</span>
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/cp-react-tree-table">
              <span className="service">npm</span>
              <span className="sep"></span>
              <span className="name">cp-react-tree-table</span>
            </a>
          </li>
        </ul>
        
        <TreeDataTable data={generateData()} height="500" className="demo-tree-table">
          <TreeDataTable.Column grow={0} basis="200px" renderCell={this.renderIndexColumn} />
          <TreeDataTable.Column grow={1} renderCell={this.renderColumn} />
        </TreeDataTable>
      </div>
    )
  }

  renderIndexColumn = (data: any, metadata: RowMetadata, toggleChildren: () => void) => {
    return (
      <div className="cell-wrapper" style={{ paddingLeft: (metadata.depth * 25) + 'px'}}>
        <span className="toggle-button-wrapper" style={{ width: '80px'}}>
          {(metadata.hasChildren)
            ? (
                <span className="toggle-button"
                  onClick={toggleChildren}>[toggle]</span>
              )
            : ''
          }
        </span>
        
        <span>{data.name}</span>
      </div>
    );
  }
  
  renderColumn = (data: any, metadata: RowMetadata, toggleChildren: () => void) => {
    return (
      <div className="cell-wrapper">
        <span>Column 2: {data.name}</span>
      </div>
    );
  }
}
