const leftOnlyUnique = (value, index, self) => self.indexOf(value) === index;
const filterMenu = (array) => {
  const result = array
    .map(({ category }) => category)
    .filter(leftOnlyUnique)
    .map((item) => ({ category: item, data: [] }));

  array.forEach((element) => {
    result.forEach((item, index) => {
      if (item.category === element.category) {
        result[index].data.push(element);
      }
    });
  });

  return result;
};

export default filterMenu;
