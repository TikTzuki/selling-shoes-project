import {lightTheme} from './light';
import {darkTheme} from './dark';
import {goldenTheme} from './golden'

export default function getThemeByName(theme){
    console.log(theme);
    return themeMap[theme];
}

export const themeMap={
    darkTheme,
    lightTheme,
    goldenTheme
}