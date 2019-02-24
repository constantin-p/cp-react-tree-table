import React, { Component } from 'react';

import { TreeTable, TreeState, TreeRow } from 'cp-react-tree-table';
import { mockData } from './mock-data';


export default class DemoApp extends Component {
  state = {
    treeValue: TreeState.create(mockData)
  };

  render() {
    const { treeValue } = this.state;
    
    return (
      <div className="wrapper">
        <p className="controls">
          <button onClick={this.handleOnExpandAll}>Expand all</button>
          <button onClick={this.handleOnCollapseAll}>Collapse all</button>
        </p>

        <TreeTable className="demo-tree-table"
          value={treeValue}
          onChange={this.handleOnChange}>
          <TreeTable.Column renderCell={this.renderIndexCell} basis="300px"/>
          <TreeTable.Column renderCell={this.renderCell}/>
        </TreeTable>
        
      </div>
    );
  }

  handleOnChange = (newValue) => {
    console.log('newValue', newValue)
    this.setState({ treeValue: newValue });
  }

  handleOnExpandAll = () => {
    console.log('Expand all');
    this.setState((state) => {
      return {
        treeValue: TreeState.expandAll(state.treeValue)
      };
    });
  }

  handleOnCollapseAll = () => {
    console.log('Collapse all');
    this.setState((state) => {
      return {
        treeValue: TreeState.collapseAll(state.treeValue)
      };
    });
  }

  renderIndexCell = (row) => {
    return (
      <div style={{ paddingLeft: (row.metadata.depth * 25) + 'px'}}>
        {(row.metadata.hasChildren)
          ? (
              <button className="toggle-button" onClick={row.toggleChildren}>
                [toggle]
              </button>
            )
          : ''
        }
        <span>{row.data.name}</span>
      </div>
    );
  }

  renderCell = (row) => {
    return (
      <span>Column 2: {row.data.name}</span>
    );
  }
}
