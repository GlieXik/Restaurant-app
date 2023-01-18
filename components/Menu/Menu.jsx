import { nanoid } from "nanoid";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

import ToogleMenu from "./ToogleMenu";
import filterArray from "@/lib/filterArray";

export const Menu = ({ menu }) => {
  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 350, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Меню :
          </ListSubheader>
        }
      >
        {filterArray(menu).map(({ type, categories }) => (
          <ToogleMenu
            key={nanoid()}
            type={type}
            categories={categories}
          ></ToogleMenu>
        ))}
      </List>
    </>
  );
};
