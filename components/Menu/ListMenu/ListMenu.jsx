import { List } from "@mui/material";

import Typography from "@mui/material/Typography";

import { nanoid } from "nanoid";
import { Fragment, useEffect } from "react";

import { Element } from "react-scroll";

import filteByMenu from "@/utils/filterByMenuCategotyes";

import MenuItem from "./MenuItem";

const ListMenu = ({ menu }) => {
  const renderMenu = (datas) => {
    return datas.map(({ category, data }) => (
      <Fragment key={nanoid()}>
        <Element name={category}>
          <List
            component="div"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              marginBottom: 1,
            }}
          >
            <Typography
              sx={{ fontSize: 20, fontWeight: "600", color: "#303030" }}
            >
              {category}
            </Typography>
          </List>
        </Element>

        {data.map((element) => {
          return <MenuItem item={element} key={nanoid()}></MenuItem>;
        })}
      </Fragment>
    ));
  };

  return <>{renderMenu(filteByMenu(menu))}</>;
};

export default ListMenu;
