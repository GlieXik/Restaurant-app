import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Link from "next/link";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { LikedContext } from "../LikedContext";
import { SwipeableDrawer } from "@mui/material";
import dynamic from "next/dynamic";
import { SearchContext } from "../SearchContext";
import { useRouter } from "next/router";
import { CartContext } from "../CartContext";
const MenuCom = dynamic(() => import("../Menu/Menu"));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,

  backgroundColor: "rgba(0, 0, 0, 0.2)",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = ({ menu }) => {
  const router = useRouter();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [mobileDrawer, setMobileDrawer] = useState(null);
  const { setSearchValue } = useContext(SearchContext);

  const { selectedLikes } = useContext(LikedContext);
  const { cart } = useContext(CartContext);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMobileDrawer = Boolean(mobileDrawer);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleDrawerOpen = (event) => {
    setMobileDrawer(true);
  };
  const handleDrawerClose = () => {
    setMobileDrawer(null);
  };
  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link href={`/${router.query.tableId}/favorite`}>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={selectedLikes.length} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <p>Вподобані</p>
        </MenuItem>
      </Link>

      {router.asPath !== "/" && (
        <Link href={`/${router.query.tableId}/cart`}>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={cart.length} color="error">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
            <p>Корзина</p>
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  const renderMobileDrawer = (
    <>
      <SwipeableDrawer
        open={isMobileDrawer}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        anchor={"left"}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <Typography variant="h3" textAlign="center" marginTop={3}>
            Меню
          </Typography>
          <MenuCom menu={menu} closeDrawer={handleDrawerClose}></MenuCom>
        </Box>
      </SwipeableDrawer>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 999 }}>
      <AppBar position="static" color="" sx={{ borderRadius: 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Restaurant
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChangeSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link href="/favorite">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={selectedLikes.length} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Link>
            {router.asPath !== "/" && (
              <Link href={`${router.asPath}/cart`}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingBasketIcon />
                  </Badge>
                </IconButton>
              </Link>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

      {renderMobileDrawer}
    </Box>
  );
};
export default Header;
