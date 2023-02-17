/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-08-24 14:41:26
 * @LastEditors: zouyawen
 * @LastEditTime: 2022-12-16 11:47:17
 */
import React, { useEffect } from 'react';
import BasicRoute from './router';
import { initTheme } from 'assets/styles/theme';
import 'cjm-componentsh5/dist/style.css';

function App() {

  // 设置主题
  useEffect(() => {
    const theme = window.localStorage.getItem('theme');
    initTheme(theme);
  })

  return (
    <BasicRoute />
  );
}

export default App;
