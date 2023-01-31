import filterArray from "./filterArray";
import filterMenu from "./filterMenu";

const filteByMenu = (menu) => {
  const arr = [];
  filterArray(menu).map(({ categories }) => {
    filterMenu(menu).map((category) => {
      categories.map((desert) => {
        if (desert === category.category) {
          arr.push(category);
        }
      });
    });
  });
  return arr;
};
export default filteByMenu;
