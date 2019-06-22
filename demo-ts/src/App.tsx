import React from 'react';
import { TreeTable, TreeState, Row } from 'cp-react-tree-table';
import { mockData } from './mock-data';


class App extends React.Component<{}, { treeValue: TreeState }> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      treeValue: TreeState.create(mockData)
    };
  }


  render() {
    const { treeValue } = this.state;

    return (
      <TreeTable className="demo-tree-table"
        value={treeValue}
        onChange={this.handleOnChange}>

        <TreeTable.Column
          renderCell={this.renderToggleCell}
          renderHeaderCell={this.renderHeaderCell}/>
        <TreeTable.Column
          renderCell={this.renderNameCell}
          renderHeaderCell={this.renderHeaderCell}/>
      </TreeTable>
    );
  }

  handleOnChange = (newValue: TreeState) => {
    this.setState({ treeValue: newValue });
  }

  renderHeaderCell = (): React.ReactNode => {
    return (
      <span>Name</span>
    );
  }

  renderNameCell = (row: Row): React.ReactNode => {
    return (
      <span>{row.data.name}</span>
    );
  }

  renderToggleCell = (row: Row): React.ReactNode => {
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
}

export default App;
