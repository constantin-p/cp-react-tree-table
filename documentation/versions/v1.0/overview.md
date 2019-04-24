---
title: "cp-react-tree-table | Documentation"
---

A fast, efficient tree table component for ReactJS.

## Installation

### Using [npm](https://www.npmjs.com/package/cp-react-tree-table):
``` shell
$ npm install --save cp-react-tree-table
```


### Using [yarn](https://yarn.pm/cp-react-tree-table):
``` shell
$ yarn add cp-react-tree-table
```


## Usage

```javascript
import { TreeTable, TreeState } from 'cp-react-tree-table';
```


```javascript
const MOCK_DATA = [
  ...
  {
    data: { name: 'Company I', expenses: '105,000', employees: '22', contact: 'Makenzie Higgs' },
    children: [
      { 
        data: { name: 'Department 1', expenses: '75,000', employees: '18', contact: 'Florence Carter' },
      },
      ...
    ]
  },
  ...
];
```

```javascript
class Demo extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      treeValue: TreeState.create(MOCK_DATA)
    };
  }

  render() {
    const { treeValue } = this.state;

    return (
      <TreeTable
        value={treeValue}
        onChange={this.handleOnChange}>

        <TreeTable.Column
          renderCell={this.renderNameCell}
          renderHeaderCell={() => <span>Name</span>}/>
        ...
      </TreeTable>
   );
  }

  handleOnChange = (newValue) => {
    this.setState({ treeValue: newValue });
  }

  renderNameCell = (row) => {
    return (
      <span>{row.data.name}</span>
    );
  }

  ...
}
```

@/jsfiddle|hb8597sr|51//@

