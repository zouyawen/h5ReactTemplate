/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-12-16 14:09:01
 * @LastEditors: zouyawen
 * @LastEditTime: 2023-02-16 15:30:35
 */
import { memo, useEffect, useState} from 'react';
import { Button } from 'cjm-componentsh5';
import { Link } from "react-router-dom";
import { url } from 'cjm-utils'
import {
    useDidCache,
    useDidRecover,
  } from "react-router-cache-route";

import './index.modules.scss'

export default memo(() => {

    const [num, setNum] = useState(0);

    useDidCache(() => {
      console.log("List did cache");
    });
    
    useDidRecover(() => {
        console.log("List did recover");
    });

    useEffect(() => {
      console.log('start effect');
      return () => {
        console.log('end useEffect')
      }
    }, [])

    return (
        <>
            <p>这里是列表页面</p>
            <p>数字变成{num}</p>
            {Array(num)
              .fill("aa")
              .map((item, i) => <p key={i}>{item} + {i}</p>)}
              <p>数字变成{num}</p>
            <Button onClick={() => setNum(prev => prev + 10)}>+10行</Button>
            <Button onClick={() => url.pushHash({pathname: '/test/page2'})}>不保存页面状态跳转页面</Button>
            <div className='linkBtn'>
              <Link
                to={{
                    pathname: `/test/page2`
                }}
              >保存页面状态link跳转</Link>

            </div>
            <Button onClick={() => url.backHash()}>返回</Button>

        </>
    )
})