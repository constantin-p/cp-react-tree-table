// @flow
import Row from '../model/row';
import type { TreeDataRow  } from '../model/row';


export const processData = (data: Array<TreeDataRow>) => {
  return processLevel(data, 0, true);
}

const processLevel = (data: Array<TreeDataRow>, depth: number = 0, isVisible: boolean = false) => {
  let result = [];
  for (var i = 0; i < data.length; i++) {
    const hasChildren: boolean = (data[i].children != null && data[i].children.length > 0);

    result.push(new Row(data[i].data, hasChildren, depth, isVisible, data[i].height));

    if (data[i].children && data[i].children.length > 0) {
      processLevel(data[i].children, depth + 1).forEach((row) => {
        result.push(row);
      });
    }
  }
  return result;
}

export const indexOf = (needle: any, haystack: Array<any>): number => {
  for (var i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return i;
    }
  }
  return -1;
}
