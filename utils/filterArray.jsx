const leftOnlyUnique = (value, index, self) => self.indexOf(value) === index;
const filterArray = (array) => {
  const result = array
    .map(({ type }) => type)
    .filter(leftOnlyUnique)
    .map((item) => ({ type: item, categories: [] }));

  array.forEach(({ type, category }) => {
    result.forEach((item, index) => {
      if (
        item.type === type &&
        !item.categories.includes(capitalizeFirstLetter(category))
      )
        result[index].categories.push(category);
    });
  });
  result.map(({ categories }) => {
    categories.sort();
  });

  return result;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default filterArray;
