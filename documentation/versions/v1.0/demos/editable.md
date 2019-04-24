---
title: "Example — editable cells"
---


@/jsfiddle|5kq2cj9m|4//@


```javascript
import { TreeTable, TreeState } from 'cp-react-tree-table';

class Demo extends React.Component {

  ...
  render() {
    return (
      <TreeTable
        value={this.state.treeValue}
        onChange={(value) => this.setState({treeValue: value})}>
        ...
        <TreeTable.Column
          renderCell={this.renderEditableCell}
          renderHeaderCell={() => <span>Contact person</span>}/>
        ...
      </TreeTable>
    );
  }

  ...
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
```
