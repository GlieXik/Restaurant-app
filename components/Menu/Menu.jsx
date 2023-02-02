import { nanoid } from "nanoid";

import List from "@mui/material/List";

import ToogleMenu from "./ToogleMenu";
import filterArray from "@/utils/filterArray";

const MenuCom = ({ menu, closeDrawer }) => {
  return (
    <>
      <List
        sx={{
          bgcolor: "background.paper",
          paddingBottom: 0,
        }}
        component="aside"
        aria-labelledby="nested-list-subheader"
      >
        {filterArray(menu).map(({ type, categories }) => {
          return (
            <ToogleMenu
              key={nanoid()}
              type={type}
              categories={categories}
              closeDrawer={closeDrawer}
            ></ToogleMenu>
          );
        })}
      </List>
    </>
  );
};
export default MenuCom;
