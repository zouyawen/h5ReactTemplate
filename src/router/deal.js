/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-12-16 11:18:30
 * @LastEditors: zouyawen
 * @LastEditTime: 2023-01-06 15:37:05
 */
import React, { lazy, Suspense } from "react";

// 路由懒加载
export const lazyWrapper = (path) => {
  return () => {

    const Component = lazy(() => import(`../views/${path}`));
  
    return (
      <Suspense fallback={<>加载中。。。</>}>
        <Component />
      </Suspense>
    );
  }
};

// 动态导入组件 ---用于页面保存状态
export const loaderComponents = (path) => {
  return () => {

    const Component = require(`../views/${path}`).default;
  
    return (
      <Suspense fallback={<>加载中。。。</>}>
        <Component />
      </Suspense>
      );
  }
};