import { nanoid } from "nanoid";

import List from "@mui/material/List";

import ToogleMenu from "./ToogleMenu";
import filterArray from "@/utils/filterArray";
import { Typography } from "@mui/material";

export const MenuCom = ({ menu }) => {
  return (
    <>
      <List
        sx={{
          bgcolor: "background.paper",
          paddingBottom: 0,
        }}
        component="aside"
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
