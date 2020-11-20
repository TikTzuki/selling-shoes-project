import {IconButton, makeStyles} from '@material-ui/core'
import React, { useState } from 'react'
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { themeMap } from '../../ultils/themes/base';

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
    const { multiTheme } = props;
    const setThemeName = multiTheme;
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme')!==undefined? localStorage.getItem('theme'): 'darkTheme');
    const nameList = Object.keys(themeMap);

    const handleChangeTheme = (event) => {
        //setThemeName(nameList[nameList.indexOf(currentTheme) === nameList.length - 1 ? 0 : nameList.indexOf(currentTheme) + 1]);
        setCurrentTheme(nameList[nameList.indexOf(currentTheme) === nameList.length - 1 ? 0 : nameList.indexOf(currentTheme) + 1]);
        setThemeName(currentTheme);
        localStorage.setItem('theme' ,currentTheme);
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
