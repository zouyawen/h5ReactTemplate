/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-08-30 13:53:15
 * @LastEditors: zouyawen
 * @LastEditTime: 2022-09-05 17:19:01
 */
import RED from './red';
import BLUE from './blue';
import cssVars from 'css-vars-ponyfill';

export const themes = {
    red: RED,
    blue: BLUE
}

export const initTheme = (theme) => {
    const defaultTheme = 'blue';
    document.documentElement.setAttribute('data-theme', theme || defaultTheme);
    cssVars({
        watch: true,
        variables: themes[theme || defaultTheme],
    })
}
