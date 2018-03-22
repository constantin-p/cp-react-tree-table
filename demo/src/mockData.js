
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateData = () => {
  let data = [];
  let count = 0;
  for (var i = 0; i < 1000; i++) {
    count++;
    let item = {
      data: { name: '[1](i:'+ (i + 1) +')' },
      children: [],
    };

    for (var j = 0; j < getRandomInt(2, 25); j++) {
      count++;
      let _item = {
        data: { name: '[2](i:'+ (j + 1) +')' },
        children: [],
      };
      for (var x = 0; x < getRandomInt(2, 15); x++) {
        count++;
        let $item = {
          data: { name: '[3](i:'+ (x + 1) +')' },
          children: [],
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
