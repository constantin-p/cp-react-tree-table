---
title: "Example — scroll to a given position"
---


@/jsfiddle|fv2e7h06|5//@


```javascript
import { TreeTable, TreeState } from 'cp-react-tree-table';

class Demo extends React.Component {
  treeTableRef = React.createRef();
  ...
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleScrollTo}>Scroll to 100px</button>

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
  handleScrollTo = () => {
    if (this.treeTableRef.current != null) {
      this.treeTableRef.current.scrollTo(100);
    }
  }
}
```
