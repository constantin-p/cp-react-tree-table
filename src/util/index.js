// @flow
import Row from '../model/row';


export const processData = (data: Array<any>) => {
  return processLevel(data, 0, true);
}

const processLevel = (data: any, depth: number = 0, visible: boolean = false) => {
  let result = [];
  for (var i = 0; i < data.length; i++) {
    result.push(new Row(data[i].data, data[i].children && data[i].children.length > 0, depth, (visible) ? null : 0));

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
