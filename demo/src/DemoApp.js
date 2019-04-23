import React, { Component } from 'react';

import { TreeTable, TreeState } from 'cp-react-tree-table';
import { generateData } from './mock-data-gen';


const MOCK_DATA = generateData();
export default class DemoApp extends Component {
  state = {
    treeValue: TreeState.create(MOCK_DATA.data)
  };

  treeTableRef = React.createRef();

  render() {
    const { treeValue } = this.state;
    
    return (
      <div className="wrapper">
        <header>
          <section>
            <div className="description">
              <h1>cp-react-tree-table</h1>
              <p>A fast, efficient tree table component for ReactJS.</p>
              <ul>
                <li>
                  <a href="https://github.com/constantin-p/cp-react-tree-table">
                    <span className="service">GitHub</span>
                    <span className="name hide-mobile"><u>cp-react-tree-table</u></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.npmjs.com/package/cp-react-tree-table">
                    <span className="service">npm</span>
                    <span className="name hide-mobile"><u>cp-react-tree-table</u></span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="install-instructions">
              <p className="install-npm">
                npm install --save cp-react-tree-table
              </p>
              <div className="divider"></div>
              <p className="install-yarn">
                yarn add cp-react-tree-table
              </p>
            </div>
          </section>
        </header>
        
        <div className="controls">
          <div className="control-section">
            <span>Node count: {this.renderNodeCount(MOCK_DATA.count)}</span>
          </div>
          <div className="control-section">
            <button onClick={this.handleOnExpandAll}>Expand all</button>
            <button onClick={this.handleOnCollapseAll}>Collapse all</button>
            <button onClick={this.handleScrollTo}>Scroll to 1000px</button>
          </div>
        </div>

        <TreeTable className="demo-tree-table"
          height="360"
          headerHeight="32"

          value={treeValue}
          onChange={this.handleOnChange}

          ref={this.treeTableRef}
          onScroll={this.handleOnScroll}>
          <TreeTable.Column renderCell={this.renderIndexCell} renderHeaderCell={this.renderHeaderCell('Name')} basis="180px" grow="0"/>
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
        treeValue: TreeState.expandAll(state.treeValue),
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
      this.treeTableRef.current.scrollTo(1000);
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

  renderNodeCount = (value) => {
    return (
      <span className="node-count">{value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
    );
  }
}
