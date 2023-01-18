import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

import toLowerCase from "@/lib/toLowerCase";
import { nanoid } from "nanoid";

const ToogleMenu = ({ type, categories }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const settingIcon = (type) => {
    switch (toLowerCase(type)) {
      case "кухня":
        return (
          <ListItemIcon>
            <SoupKitchenIcon />
          </ListItemIcon>
        );

      case "бар":
        return (
          <ListItemIcon>
            <SportsBarIcon />
          </ListItemIcon>
        );

      default:
        return (
          <ListItemIcon>
            <IndeterminateCheckBoxIcon></IndeterminateCheckBoxIcon>
          </ListItemIcon>
        );
    }
  };
  return (
    <>
      <ListItemButton key={nanoid()} onClick={handleClick}>
        {settingIcon(type)}
        <ListItemText primary={type} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categories.map((e) => {
            return (
              <ListItemButton sx={{ pl: 12 }} key={nanoid()}>
                <ListItemText primary={e} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};
export default ToogleMenu;
