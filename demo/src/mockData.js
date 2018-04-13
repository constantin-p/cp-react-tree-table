// @flow
import type { TreeDataRow } from 'cp-react-tree-table';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const defaultHeightRows: Array<TreeDataRow> = [
  {
    data: { name: `[1](i:1)`, heightLabel: `default` },
  }
];

const heightValues = [26, 30, 32, 36, 38, 42];
export const generateData = (): { data: Array<TreeDataRow>, count: number } => {
  let data: Array<TreeDataRow> = [...defaultHeightRows];
  let count = 0;
  for (var i = defaultHeightRows.length; i < 1000; i++) {
    count++;

    const height = heightValues[getRandomInt(0, 1)]; // 26 or 30
    let item: TreeDataRow = {
      data: { name: `[1](i:${(i + 1)})`, heightLabel: `${height}px` },
      height: height,
      children: [],
    };

    for (var j = 0; j < getRandomInt(2, 25); j++) {
      count++;

      const _height = heightValues[getRandomInt(2, 3)]; // 32 or 36
      let _item: TreeDataRow = {
        data: { name: `[2](i:${(j + 1)})`, heightLabel: `${_height}px` },
        height: _height,
        children: [],
      };
      for (var x = 0; x < getRandomInt(2, 15); x++) {
        count++;
        
        const $height = heightValues[getRandomInt(4, 5)]; // 38 or 42
        let $item: TreeDataRow = {
          data: { name: `[3](i:${(x + 1)})`, heightLabel: `${$height}px` },
          height: $height,
        };
        _item.children.push($item);
      }
      item.children.push(_item);
    }
    data.push(item);
  }
  return {
    data: data,
    count: count,
  };
}
