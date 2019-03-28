import React, { Component } from 'react';

import { TreeTable, TreeState, TreeRow } from 'cp-react-tree-table';
import { mockData } from './mock-data';


export default class DemoApp extends Component {
  state = {
    treeValue: TreeState.create(mockData)
  };

  treeTableRef = React.createRef();

  render() {
    const { treeValue } = this.state;
    
    return (
      <div className="wrapper">
        <p className="controls">
          <button onClick={this.handleOnExpandAll}>Expand all</button>
          <button onClick={this.handleOnCollapseAll}>Collapse all</button>
          <button onClick={this.handleScrollTo}>Scroll to 100px</button>
        </p>

        <TreeTable className="demo-tree-table"
          value={treeValue}
          onChange={this.handleOnChange}

          ref={this.treeTableRef}
          onScroll={this.handleOnScroll}>
          <TreeTable.Column renderCell={this.renderIndexCell} renderHeaderCell={this.renderHeaderCell('Column 1')} basis="300px"/>
          <TreeTable.Column renderCell={this.renderCell} renderHeaderCell={this.renderHeaderCell('Column 2')}/>
          <TreeTable.Column renderCell={this.renderEditableCell} renderHeaderCell={this.renderHeaderCell('Column 3')}/>
        </TreeTable>
        
      </div>
    );
  }

  handleOnChange = (newValue) => {
    console.log('newValue', newValue)
    this.setState({ treeValue: newValue });
  }

  handleOnScroll = (newValue) => {
    console.log('onScroll', newValue)
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

  handleScrollTo = () => {
    console.log('Scroll to');
    if (this.treeTableRef.current != null) {
      this.treeTableRef.current.scrollTo(100);
    }
  }

  renderHeaderCell = (name) => {
    return () => {
      return (
        <span>{name}</span>
      );
    }
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

  renderEditableCell = (row) => {
    return (
      <span>(Editable)
        <input type="text" value={row.data.name}
          onChange={(event) => {
            row.updateData({
              name: event.target.value,
            });
          }}/>
      </span>
    );
  }
}
