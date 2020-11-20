import {AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core';
import React from 'react';
import Menu from "@material-ui/icons/Menu";
import {makeStyles} from '@material-ui/styles'
const useStyles = makeStyles(()=>({
    typographyStyles: {
        flex: 1
    }
}));
const Header = (props) => {
    const classes = useStyles();
    const setThemeName = props.multiTheme;/*
    return (
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={classes.navIconHide}
            >
              <Menu /> 
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Writers Blog
            </Typography>
            <Button
              variant="contained"
              corlor="primary"
              onClick={()=> setThemeName("lightTheme")}
            >
              Light
            </Button>
            <Button
              variant="contained"
              corlor="secondary"
              onClick={()=>setThemeName("darkTheme")}
            >
              Dark
            </Button>
          </Toolbar>
        </AppBar>
    )*/
    return (<></>)
}
export default Header;