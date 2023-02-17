/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-12-16 11:11:59
 * @LastEditors: zouyawen
 * @LastEditTime: 2022-12-16 11:14:54
 */
//高德地图密钥
export const amapkey = "c9ecd2e1ed4f59cf7177596d50e62fec";

// 是否是本地开发环境
const location = window.location;
export const isDev =
  location.href.indexOf("http://localhost") === 0 ||
  location.href.indexOf("http://192.168") === 0 ||
  location.href.indexOf("http://127.0.0.1") === 0;
// 是否是测试环境
export const isTesting = location.href.indexOf(".kf315.net") >= 0;
// 是否是生产环境
export const isProduction = !(isDev || isTesting);

// 本地开发设置
const devConfig = {
  // 图片上传返回值
  fileDomain: "https://filetest.jgwcjm.com",
  //视频播放域名
  videoDomain: "https://cjm3v.kf315.net"
};

// 测试环境设置（单域名）
const testConfig = {
  // 图片上传返回值
  fileDomain: "https://filetest.jgwcjm.com",
  //视频播放域名
  videoDomain: "https://cjm3v.kf315.net"
};
// 生产环境设置
const productionConfig = {
  // 图片上传返回值
  fileDomain: "https://xhlj.hzxh.gov.cn/oss",
  //视频播放域名
  videoDomain: "https://cjm3v.kf315.net"
};
//
let config = {};
if (isDev) {
  config = devConfig;
} else if (isTesting) {
  config = testConfig;
} else if (isProduction) {
  config = productionConfig;
}
const finalConfig = { ...config };
export default finalConfig;
