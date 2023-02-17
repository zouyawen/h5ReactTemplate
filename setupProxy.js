/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2023-01-09 14:53:12
 * @LastEditors: zouyawen
 * @LastEditTime: 2023-01-09 14:53:40
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

// 网关
module.exports = function (app) {

  app.use(createProxyMiddleware('/apiInterface/interface', {
    target: `http://scydn.kf315.net`,
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': 'localhost', // 把相应的 cookie 域都设置成 localhost，或者指定的域名
    },
    pathRewrite: {
      // '^/apiInterface/interface': '/',
      // '^/interface': '/',
    },
  }))
};
