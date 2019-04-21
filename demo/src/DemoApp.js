import React, { Component } from 'react';

import { TreeTable, TreeState } from 'cp-react-tree-table';
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
          <button onClick={this.handleScrollToGroupBeta}>Scroll to "Group Beta"</button>
        </p>

        <TreeTable className="demo-tree-table" headerHeight="32"
          value={treeValue}
          onChange={this.handleOnChange}

          ref={this.treeTableRef}
          onScroll={this.handleOnScroll}>
          <TreeTable.Column renderCell={this.renderIndexCell} renderHeaderCell={this.renderHeaderCell('Name')} basis="220px" grow="0"/>
          <TreeTable.Column renderCell={this.renderEditableCell} renderHeaderCell={this.renderHeaderCell('Contact person')}/>
          <TreeTable.Column renderCell={this.renderEmployeesCell} renderHeaderCell={this.renderHeaderCell('Employees', false)}/>
          <TreeTable.Column renderCell={this.renderExpensesCell} renderHeaderCell={this.renderHeaderCell('Expenses ($)', false)}/>
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

  handleScrollToGroupBeta = () => {
    console.log('Scroll to "Group Beta"');
    const { treeValue } = this.state;

    const node = mockData[8].children[0].children[1];
    const rowModel = treeValue.findRowModel(node);
    if (rowModel != null) {
      this.setState({
        treeValue: TreeState.expandAncestors(treeValue, rowModel),
      }, () => {
        if (this.treeTableRef.current != null) {
          this.treeTableRef.current.scrollTo(rowModel.$state.top);
        }
      });
    }
  }


  renderHeaderCell = (name, alignLeft = true) => {
    return () => {
      return (
        <span className={alignLeft ? 'align-left' : 'align-right'}>{name}</span>
      );
    }
  }

  renderIndexCell = (row) => {
    return (
      <div style={{ paddingLeft: (row.metadata.depth * 15) + 'px'}}
        className={row.metadata.hasChildren ? 'with-children' : 'without-children'}>
        {(row.metadata.hasChildren)
          ? (
              <button className="toggle-button" onClick={row.toggleChildren}></button>
            )
          : ''
        }
        <span>{row.data.name}</span>
      </div>
    );
  }

  renderEmployeesCell = (row) => {
    return (
      <span className="employees-cell">{row.data.employees}</span>
    );
  }

  renderExpensesCell = (row) => {
    return (
      <span className="expenses-cell">{row.data.expenses}</span>
    );
  }

  renderEditableCell = (row) => {
    return (
      <input type="text" value={row.data.contact}
        onChange={(event) => {
          row.updateData({
            ...row.data,
            contact: event.target.value,
          });
        }}/>
    );
  }
}
