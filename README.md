# cp-react-tree-table
[![npm version](https://badge.fury.io/js/cp-react-tree-table.svg)](https://badge.fury.io/js/cp-react-tree-table)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/constantin-p/cp-react-tree-table/raw/master/LICENSE)

A fast, efficient tree table component for ReactJS.

[Live Demo](https://constantin-p.github.io/cp-react-tree-table)


### Installation

###### [Method A] Using [npm](https://www.npmjs.com):

```sh
npm install --save cp-react-tree-table
```

###### [Method B] Using [yarn](https://yarnpkg.com):

```sh
yarn add cp-react-tree-table
```


### Usage

Import the `cp-react-tree-table` module:

```javascript
import TreeDataTable from 'cp-react-tree-table';
```


### Example

[Example Live Demo](https://jsfiddle.net/constantin_p/wzjgspe9/)

```javascript
import React, { Component } from 'react';

import TreeDataTable from 'cp-react-tree-table';


const mockData = [
  {
    data: { name: '[1](1)' },
    children: [
      {
        data: { name: '[2](1)' },
        children: [
          {
            data: { name: '[3](1)' },
          },
          {
            data: { name: '[3](2)' },
          },
          {
            data: { name: '[3](3)' },
          }
        ],
      },
      {
        data: { name: '[2](2) Height: 40px.' },
        height: 40,
      }
    ],
  },
  {
    data: { name: '[1](2) Height: 30px.' },
    height: 30,
  },
];


export default class DemoApp extends Component {
  render () {
    return (
        <TreeDataTable data={mockData} height={100} className="demo-tree-table">
          <TreeDataTable.Column grow={0} basis="200px" renderCell={this.renderIndexColumn} />
          <TreeDataTable.Column grow={1} renderCell={this.renderColumn} />
        </TreeDataTable>
    );
  }

  renderIndexColumn = (data, metadata, toggleChildren) => {
    return (
      <div style={{ paddingLeft: (metadata.depth * 25) + 'px'}}>
        <span className="toggle-button-wrapper" style={{ width: '80px'}}>
          {(metadata.hasChildren)
            ? (
                <span onClick={toggleChildren}>[toggle]</span>
              )
            : ''
          }
        </span>
        
        <span>{data.name}</span>
      </div>
    );
  }
  
  renderColumn = (data, metadata, toggleChildren) => {
    return (
      <span>Column 2: {data.name}</span>
    );
  }
}
```


## Props
Props for `TreeDataTable`:

| Prop                | Type       | Required | Description              |
|---------------------|------------|----------|------------------------  | 
| **`data`**          | _Array_    | `yes`    | List of data items       | 
| **`height`**        | _Number_   | no       | Table height (px) \*     |
| **`className`**     | _String_   | no       | Table custom class \*\*  |


_**\* Table height:** default `200`._

_**\*\* Table custom class:** will be appended to the classList of `TreeDataTable`'s root element._


Props for `TreeDataTable.Column`:

| Prop              | Type       | Required | Description              |
|-------------------|------------|----------|------------------------  | 
| **`grow`**        | _Number_   | no       | `flexGrow` CSS property  | 
| **`basis`**       | _String_   | no       | `flexBasis` CSS property |
| **`renderCell`**  | _Function_ | `yes`    | Renders a single cell \* |


_**\* `renderCell(rowData, rowMetadata, toggleChildren) => Node`**:_

  * **`rowData`**: The item data object.
  * **`rowMetadata`**: Metadata object describing the item state:
    * **`depth`**: (`number`) Starts from 0, indicates the depth level of the item inside the tree.
    * **`hasChildren`**: (`boolean`)
  * **`toggleChildren`**: Callback function that will toggle direct descendants of the item.



## [`TreeDataRow`](https://github.com/constantin-p/cp-react-tree-table/blob/c41f609cd806d2b2b15acf45ab120148691d0519/src/model/row.js#L5) Object type
Properties:

|                   | Type       | Required | Description              |
|-------------------|------------|----------|------------------------  | 
| **`data`**        | _any_      | `yes`    | The item data object     | 
| **`height`**      | _Number_   | no       | Row height (px) \*       |
| **`children`**    | _Array<TreeDataRow>_   | no       | List of children data items |

_**\* Row height:** default `26`px._



## License

This project is MIT licensed.
Please see the [LICENSE](LICENSE) file for more information.
