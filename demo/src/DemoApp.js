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

        <header>
          <div className="header-section links">
            <ul>
              <li>
                <a href="https://github.com/constantin-p/cp-react-tree-table">
                  <span className="service">GitHub</span>
                  <span className="name hide-mobile">cp-react-tree-table</span>
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/cp-react-tree-table">
                  <span className="service">npm</span>
                  <span className="name hide-mobile">cp-react-tree-table</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="header-section install">
            <p className="install-npm">
              npm install --save cp-react-tree-table 
            </p>
            <div className="divider hide-mobile"></div>
            <p className="install-yarn hide-mobile">
              yarn add cp-react-tree-table
            </p>
          </div>
        </header>
        
        <TreeDataTable data={generateData()} height={500} className="demo-tree-table">
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
