import { nanoid } from "nanoid";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

import ToogleMenu from "./ToogleMenu";
import filterArray from "@/lib/filterArray";
import { Typography } from "@mui/material";

export const Menu = ({ menu }) => {
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 350,
          bgcolor: "background.paper",
          paddingBottom: 0,
          position: "sticky",
          top: 80,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={<Typography>Меню :</Typography>}
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
