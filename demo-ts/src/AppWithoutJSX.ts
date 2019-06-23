import React from 'react';
import { TreeTable, TreeState, Row } from 'cp-react-tree-table';
import { mockData } from './mock-data';


class AppWithoutJSX extends React.Component<{}, { treeValue: TreeState }> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      treeValue: TreeState.create(mockData)
    };
  }

  render() {
    const { treeValue } = this.state;

    return React.createElement(TreeTable, {
        className: 'demo-tree-table demo-without-jsx',
        value: treeValue,
        onChange: this.handleOnChange
      }, React.createElement(TreeTable.Column, {
        renderCell: this.renderToggleCell,
        renderHeaderCell: this.renderHeaderCell
      }),
      React.createElement(TreeTable.Column, {
        renderCell: this.renderNameCell,
        renderHeaderCell: this.renderHeaderCell
      }));
  }

  handleOnChange = (newValue: TreeState) => {
    this.setState({ treeValue: newValue });
  }

  renderHeaderCell = (): React.ReactNode => {
    return React.createElement('span', null, 'Name');
  }

  renderNameCell = (row: Row): React.ReactNode => {
    return React.createElement('span', null, row.data.name);
  }

  renderToggleCell = (row: Row): React.ReactNode => {
    return React.createElement('div', {
        style: {
          paddingLeft: row.metadata.depth * 15 + 'px'
        },
        className: row.metadata.hasChildren ? 'with-children' : 'without-children'
      }, row.metadata.hasChildren
      ? React.createElement('button', {
          className: 'toggle-button',
          onClick: row.toggleChildren
        })
      : '', React.createElement('span', null, row.data.name));
  }
}

export default AppWithoutJSX;
