---
title: "Example — scroll to a specific node"
---


@/jsfiddle|bksfxe61|11//@


```javascript
import { TreeTable, TreeState } from 'cp-react-tree-table';

class Demo extends React.Component {
  ...
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleScrollToGroupBeta}>Scroll to "Group Beta"</button>

        <TreeTable
          value={this.state.treeValue}
          onChange={(value) => this.setState({treeValue: value})}

          ref={this.treeTableRef}>
          ...
        </TreeTable>
      </React.Fragment>
    );
  }

  ...
  handleScrollToGroupBeta = () => {
    console.log('Scroll to "Group Beta"');
    const { treeValue } = this.state;

    // The node to which the table's viewport will scroll to
    const node = MOCK_DATA[8].children[0].children[1];
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
}
```