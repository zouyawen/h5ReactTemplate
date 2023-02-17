/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-12-16 11:16:03
 * @LastEditors: zouyawen
 * @LastEditTime: 2023-01-09 15:38:51
 */
import { lazyWrapper, loaderComponents } from './deal'

const routerList = [
    {
        path: '/',
        name: '测试页面一',
        component: loaderComponents('test/page1'),
        isKeep: true
    },
    {
        path: '/test/page1',
        name: '测试页面一',
        component: loaderComponents('test/page1'),
        isKeep: true
    },
    {
        path: '/test/page2',
        name: '测试页面二',
        component: lazyWrapper('test/page2'),
    }
]

export default routerList;