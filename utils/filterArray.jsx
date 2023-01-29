// const leftOnlyUnique = (value, index, self) => self.indexOf(value) === index;
// const filterArray = (array) => {
//   const result = array
//     .map(({ type }) => type)
//     .filter(leftOnlyUnique)
//     .map((item) => ({ type: item, categories: [] }));

//   array.forEach(({ type, category }) => {
//     result.forEach((item, index) => {
//       if (item.type === type && !item.categories.includes(category))
//         result[index].categories.push(category);
//     });
//   });
//   result.map(({ categories }) => {
//     categories.sort();
//   });

//   return result;
// };
// export default filterArray;
