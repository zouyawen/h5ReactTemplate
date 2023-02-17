/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-08-29 16:51:33
 * @LastEditors: zouyawen
 * @LastEditTime: 2022-12-16 11:45:44
 */
const path = require('path');

const resolve =  function (target) {
  return path.resolve(__dirname, target);
};

const myAlias = {
  assets: resolve('../src/assets'),
  src: resolve('../src'),
  components: resolve('../src/components'),
  public: resolve('../public'),
  api:resolve('../src/api'),
  config:resolve('../src/config'),
  services:resolve('../src/services')
};

module.exports = myAlias;