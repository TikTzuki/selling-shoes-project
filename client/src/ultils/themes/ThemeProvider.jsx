import {MuiThemeProvider} from "@material-ui/core";
import React, { useState, createContext } from "react";
import getThemeByName from "./base";
export const ThemeContext = createContext((themeName)=>{
    
});
export const theme = createContext((theme)=>{
    
})
const ThemeProvider = (props) => {
    const [themeName, _setThemeName] = useState(Boolean(localStorage.getItem('theme'))? localStorage.getItem('theme'): 'darkTheme');
    const theme = getThemeByName(themeName);

    return <ThemeContext.Provider value={_setThemeName}>
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
        </ThemeContext.Provider>
}
export default ThemeProvider;
