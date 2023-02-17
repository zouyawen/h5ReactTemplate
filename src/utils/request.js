/**
 * @Description:
 * @Version: 2.0
 * @Autor: chenqing
 * @Date:2022-12-13 15:59:25
 */

import axios from 'axios';
import storage from './storage';

const formatParams = function(params) {
  return { ...params };
};
// 清除所有缓存数据
const clearAll = function() {
  //! 这里不能写死，后续看一下参数从哪里透进来
  storage.set('token', '');
  storage.set('userDetail', '');
};

const dealOptions = function(options) {
  options.headers = options.headers ?? {};
  options.headers.channel = 'qianduan';
  const isDev = window.location.href.indexOf('localhost') >= 0;
  if (isDev) {
    options.headers.whitelist = 'localhost';
  }
  return options;
};

function getSuperToken(url) {
  let token = '';

  if (url.includes('top-token=')) {
    let index = url.indexOf('=');
    let value = url.substring(index + 1, url.length);
    token = value;
  } else {
    if (!token || token === 'undefined') {
      token = storage.get('top-token');
    }
  }

  storage.set('top-token', token);
  return token === 'undefined' ? '' : token;
}

const toAxios = async ({
  method,
  api,
  params = {},
  options = {},
  resolve,
  reject,
}) => {
  api = `/apiInterface/interface${api}`;
  return axios[method](api, params, dealOptions(options))
    .then((res) => {
      if (res) {
        resolve(res.data);
      }
    })
    .catch(reject);
};

export const ajax = {
  /**
   * 发送ajax请求
   * @alias module:utils/ajax[method]
   * @param method {String} 请求方法
   * @param api {String} 请求地址
   * @param params {Object} http参数
   * @param options {Object}
   * @returns {Promise}
   */
  sendRequest(method, api, params, options = {}, isForm) {
    const data = new FormData();
    let formatResult = {};
    if (isForm) {
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
    } else {
      formatResult = options.noFormat ? params : formatParams(params);
      // formatResult._r_ = Math.floor(Math.random() * 10000000 + 10000000); // 增加一个随机数参数，禁止IE的缓存
      options.params = formatResult;
    }

    return new Promise((resolve, reject) => {
      toAxios({
        method,
        api,
        params: isForm ? data : formatResult,
        options: dealOptions(options),
        resolve,
        reject,
      });
    });
  },
};

function setHeaderToken(
  opt = { headers: {} },
  url
) {
  const loginToken = getSuperToken(url) || '';
  if (loginToken) {
    if (!opt.headers['top-token']) {
      opt.headers['top-token'] = loginToken;
    }
  }
  return opt;
}

const handleAjax = async (
  method,
  api,
  params,
  setOptions,
  isForm
) => {
  let err = null;
  let res = null;
  let options = { headers: { ...ajaxSync.headers }, ...setOptions };
  options = setHeaderToken(options, api);
  try {
    res = await ajax.sendRequest(method, api, params, options, isForm);
    if (res.state !== 200) {
      err = new Error(res.msg);
    }
  } catch (error) {
    err = error;
    console.log(err);
  }
  return { res, err };
};

/**
 * ajaxSync，定义header参数
 * @param url {String} 请求地址
 * @param method {String} 请求方法
 * @param params {Object} http参数
 * @param setOptions {Object}
 * @param isForm {boolean}是否是表单
 * @returns {Promise}
 */
export const ajaxSync = {
  headers: {},
  setHeaders(headers = {}) {
    ajaxSync.headers = { ...ajaxSync.headers, ...headers };
    return ajaxSync;
  },
  ajaxRequest(method, url, params, setOptions, isForm) {
    return handleAjax(method, url, params, setOptions, isForm);
  },
};

// 把获取到的数据过滤一遍，把空的初始化为undefined
const replaceNull = (obj) => {
  for (const key in obj) {
    // 判断obj的类型
    switch (Object.prototype.toString.call(obj[key]).slice(8, -1)) {
      case 'Object':
        replaceNull(obj[key]);
        break;
      case 'Array':
        for (let i = 0; i < obj[key].length; i++) {
          replaceNull(obj[key][i]);
        }
        break;
      default:
        if (obj[key] === null) obj[key] = undefined;
    }
  }
};

let isLogout = false; //防止401接口循环调用

/**
 * 暴露request请求
 * @param url {String} 请求地址
 * @param method {String} 请求方法
 * @param data {Object} http参数
 * @param options {Object}
 * @param isForm {boolean}是否是表单
 * @returns {result}
 */
async function request({
  url,
  data,
  method = 'get',
  options = {},
  isForm,
}) {
  const resp = await ajaxSync.ajaxRequest(method, url, data, options, isForm);

  if (!resp) {
    return {};
  }
  const res = resp.res || {};
  if (res.state === 401) {
    if (!isLogout) {
      isLogout = true;
      clearAll();
      setTimeout(() => {
        isLogout = false;
      }, 2 * 1000);
    }
  } else if (resp.err) {
    // 是否关闭报错
    if (!options.closeLog) {
      console.log(resp.err);
      return resp.err;
    }
  }
  const { results, ...others } = res || {};
  replaceNull(results);
  return { results, ...others };
}

export default request;
