/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-12-16 11:15:54
 * @LastEditors: zouyawen
 * @LastEditTime: 2023-01-06 15:46:52
 */
import React, { memo, Suspense } from 'react';
import {
    HashRouter as Router,
    Route,
} from "react-router-dom";
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import routeList from './map';

export default memo(() => {

    // // 接口请求菜单数据
    // const [routerUrl] = useState([
    //     '/test1', 
    //     '/test2',
    // ])

    // const newRouter = routeList.filter(item => routerUrl.indexOf(item.path) > -1);

    return (
        <Router >
            <CacheSwitch>
                {routeList.map((item, index) => {
                    const Component = item.component;

                    return item.isKeep ? (
                        <CacheRoute 
                            key={index} 
                            exact 
                            path={item.path} 
                            cacheKey={`${index}`}
                            component={Component}
                            // when="back"
                        >
                        </CacheRoute>
                    ) : (
                        <Route key={index} exact path={item.path}>
                            <Suspense fallback={<>加载中。。。</>}>
                                <Component />
                            </Suspense>
                        </Route>
                    )
                })}
                <Route path="*">
                    <>404 未找到页面</>
                </Route>


            </CacheSwitch>
        </Router>
    )
})