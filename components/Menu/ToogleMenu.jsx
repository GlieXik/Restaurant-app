import { useEffect, useState } from "react";
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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import toLowerCase from "@/lib/toLowerCase";
import { nanoid } from "nanoid";

import { Link } from "react-scroll";

const ToogleMenu = ({ type, categories }) => {
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   // document.addEventListener("scroll", (e) => console.log(window.scrollY));
  // }, []);

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
      <ListItemButton
        key={nanoid()}
        onClick={handleClick}
        sx={{ borderRadius: 1 }}
      >
        {settingIcon(type)}
        <ListItemText primary={type} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categories.map((category) => {
            return (
              <Link
                key={nanoid()}
                to={category}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
              >
                <ListItemButton sx={{ pl: 12, borderRadius: 1 }}>
                  {/* <FiberManualRecordIcon
                    sx={{ width: 8, position: "absolute", left: 80 }}
                  ></FiberManualRecordIcon> */}
                  <ListItemText primary={category} />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};
export default ToogleMenu;
