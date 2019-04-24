---
title: "Example — collapseAll/expandAll"
---


@/jsfiddle|uha90r3e|11//@


```javascript
import { TreeTable, TreeState } from 'cp-react-tree-table';

class Demo extends React.Component {

  ...
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleOnExpandAll}>Expand all</button>
        <button onClick={this.handleOnCollapseAll}>Collapse all</button>

        <TreeTable
          value={this.state.treeValue}
          onChange={(value) => this.setState({treeValue: value})}>
          ...
        </TreeTable>
      </React.Fragment>
    );
  }

  ...
  handleOnExpandAll = () => {
    this.setState((state) => {
      return {
        treeValue: TreeState.expandAll(state.treeValue),
      };
    });
  }
  handleOnCollapseAll = () => {
    this.setState((state) => {
      return {
        treeValue: TreeState.collapseAll(state.treeValue)
      };
    });
  }
}
```
