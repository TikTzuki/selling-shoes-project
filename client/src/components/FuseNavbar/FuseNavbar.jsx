import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Button,
  Collapse,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/icons/Menu";
import withStyles from "@material-ui/core/styles/withStyles";

import compose from "recompose/compose";
import Header from "../Header";
import ThemeSwitchIcon from "../ThemeSwitchIcon/ThemeSwitchIcon";
const drawerWidth = 240;

const styles = (theme) => {
  console.log(theme);
  return {
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    navIconHide: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up("md")]: {
        position: "relative",
      },
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    buttonNav: {
      width: "100%",
      textTransform: "none"
    }
  }
};

const listMenu = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Kho",
    to: "/warehouse",
    dropdownList: [
      { name: "Phiếu đặt hàng", to: "/purchase-order/portal" },
      { name: "Phiếu nhập kho", to: "/grn/portal" },
      { name: "Hóa đơn nhập hàng", to: "/bill/portal" },
    ]
  },
  {
    name: "Sản phẩm",
    to: "/product",
    dropdownList: [
      { name: "Quản lý sản phẩm", to: "/portal" },
      { name: "Thêm sản phẩm", to: "/newpublish" },
    ]
  },
  {
    name: "Đơn hàng laz",
    to: "/laz-order",
  },
  {
    name: "Bán tại quầy",
    to: "/order-local",
    dropdownList: [
      {name: "Thêm hóa đơn", to: "/newpublish"},
      {name: "Quản lý hóa đơn", to: "/portal"}
    ]
  },
  {
    name: "Thống kê",
    to: "/analysis"
  },
  {
    name: "Lazada",
    to: "/authorization"
  }
];

const FuseNavbar = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropSwitcher, setDropSwitcher] = useState(-1)
  const {
    classes,
    location: { pathname },
    children,
    writers,
    multiTheme
  } = props;
  const handleDropdown = (event) => {
    setDropSwitcher((dropSwitcher === event.currentTarget.getAttribute("drop-index") ? -1 : event.currentTarget.getAttribute("drop-index")));
    console.log(event.currentTarget.getAttribute("drop-index"))
    //console.log(this.state.anchorEl);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <MenuList>
      {listMenu.map((menuItem) => {
            if ((menuItem.hasOwnProperty('dropdownList'))) {
              return (<div key={menuItem.name}>
                <MenuItem component={Button} key={menuItem.name} disableRipple className={classes.buttonNav} drop-index={menuItem.name} variant="text" onClick={handleDropdown}>
                  {menuItem.name}
                </MenuItem>
                <Collapse in={dropSwitcher === menuItem.name ? true : false} timeout={300}>
                  <MenuList>
                    {menuItem.dropdownList.map((dropDownItem)=>{
                      return (
                        <MenuItem to={menuItem.to+dropDownItem.to} key={dropDownItem.name} className={classes.nested} component={Link} selected={menuItem.to+dropDownItem.to === pathname}>
                          {dropDownItem.name}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Collapse>
              </div>)
            } else {
              return (
                <MenuItem key={menuItem.name} component={Link} to={menuItem.to} selected={menuItem.to === pathname}>
                  {menuItem.name}
                </MenuItem>)
            }
      })}
      </MenuList>
    </div>
  );
  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={classes.navIconHide}
            >
              < Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Writers Blog
            </Typography>
            <ThemeSwitchIcon multiTheme={multiTheme} />
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} classes={{ paper: classes.drawerPaper, }} ModalProps={{ keepMounted: true, }}>
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper, }}>
            {drawer}
          </Drawer>
        </Hidden>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </Fragment>
  );
}

export default compose(withRouter, withStyles(styles))(FuseNavbar);

/*

        <MenuItem component={Link} to="/" selected={"/" === pathname}>
          Home
        </MenuItem>
        <MenuItem
          component={Link}
          to="/products"
          selected={"/products" === pathname}
        >
          Table Product
        </MenuItem>
        <MenuItem component={Link} to="/writers" selected={"/writers" === pathname} >
          Writers
        </MenuItem>
        <MenuItem component={Button} className={classes.buttonNav} drop-index={1} variant="text" onClick={handleDropdown}>
          toggle
        </MenuItem>

        <Collapse in={dropSwitcher == 1 ? true : false} timeout={300}>
          <MenuList>
            {writers.map(({ id, name }) => {
              const to = `/writers/${id}`;
              return (
                <MenuItem to={to} key={id} className={classes.nested} component={Link} selected={to === pathname} >
                  {name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Collapse>
        <MenuItem component={Button} className={classes.buttonNav} drop-index={2} variant="text" onClick={handleDropdown}>
          toggle
        </MenuItem>

        <Collapse in={dropSwitcher == 1 ? true : false} timeout={300}>
          <MenuList>
            {writers.map(({ id, name }) => {
              const to = `/writers/${id}`;
              return (
                <MenuItem to={to} key={id} className={classes.nested} component={Link} selected={to === pathname} >
                  {name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Collapse>

*/ 