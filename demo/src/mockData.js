
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateData = () => {
  let data = [];
  for (var i = 0; i < 1000; i++) {
    let item = {
      data: { name: '[1]('+ (i + 1) +')' },
      children: [],
    };

    for (var j = 0; j < getRandomInt(0, 25); j++) {
      let _item = {
        data: { name: '[2]('+ (j + 1) +')' },
        children: [],
      };
      item.children.push(_item);
    }
    data.push(item);
  }
  return data;
}
