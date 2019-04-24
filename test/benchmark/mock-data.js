
const generateData = (childrenCount, depth, startIndex) => {
  let count = startIndex || 0, data = [];
  for (let i = 0; i < childrenCount; i++) {
    let item = {
      data: { name: `index:${count}|depth:${depth}` },
      children: [],
    };
    count++;

    if (depth > 1) {
      const result = generateData(childrenCount, depth - 1, count);
      item.children = result[0];
      count = result[1];
    }
    data.push(item);
  }
  return [data, count];
}


exports.generateData = generateData;