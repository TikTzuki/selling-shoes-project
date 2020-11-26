import {IconButton, makeStyles} from '@material-ui/core'
import React, { useContext, useState } from 'react'
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { themeMap } from '../../ultils/themes/base';
import { ThemeContext } from '../../ultils/themes/ThemeProvider';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: '0'
    },
    themeButton: {
      zIndex: '10'
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function ThemeSwitchIcon(props) {
    const classes = useStyles();
    const setThemeName = useContext(ThemeContext);
    const [currentTheme, setCurrentTheme] = useState(Boolean(localStorage.getItem('theme'))? localStorage.getItem('theme'): 'darkTheme');
    const nameList = Object.keys(themeMap);

    const handleChangeTheme = (event) => {
        //setThemeName(nameList[nameList.indexOf(currentTheme) === nameList.length - 1 ? 0 : nameList.indexOf(currentTheme) + 1]);
        let nextTheme = nameList[nameList.indexOf(currentTheme) === nameList.length - 1 ? 0 : nameList.indexOf(currentTheme) + 1];
        setCurrentTheme(nextTheme);
        setThemeName(nextTheme);
        localStorage.setItem('theme' , nextTheme);
    }

    return (
        <IconButton aria-label="delete" variant="contained" color="secondary" onClick={handleChangeTheme} className={classes.themeButton}>
            {
              {
                'darkTheme': <Brightness2Icon/>,
                'lightTheme': <Brightness7Icon/>,
                'goldenTheme': <Brightness5Icon/>
              }[currentTheme]
            }
          </IconButton>
    )
}

export default ThemeSwitchIcon
