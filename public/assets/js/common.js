/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-08-25 14:54:27
 * @LastEditors: zouyawen
 * @LastEditTime: 2023-02-16 14:27:27
 */

(function() {
    // const local = window.location;
    // // 是否是本地开发环境
    // const isDev =
    //   local.href.indexOf('http://localhost') === 0 ||
    //   local.href.indexOf('http://192.168') === 0 ||
    //   local.href.indexOf('http://127.0.0.1') === 0;
    // // 是否是测试环境
    // const isTesting = local.href.indexOf('.kf315.net') >= 0;
    // // 是否是生产环境
    // const isProduction = !(isDev || isTesting);

    // 开启调试工具
    // !isProduction && eruda && eruda.init();
    
    // // 适老版
    let ratio = 3.75;
    // try {
    //   ZWJSBridge.onReady(() => {
    //     console.log('初始化完成后，执⾏bridge⽅法');
    //     ZWJSBridge.getUiStyle({})
    //     .then((result) => {   
    //       switch(result.uiStyle) {
    //         case 'normal':
    //           ratio = 10;
    //             break;
    //         case 'elder':
    //           ratio = 8;
    //             break;
    //         default:
    //           ratio = 10;
    //       } 
    //       setFontSize()
    //     })
    //     //浙里办APP 6.11.0 版本以下版本标准模式兼容
    //     .catch((error) => { 
    //       ratio = 10;
    //       setFontSize()
    //       console.log(error); 
    //     });
    //   })
    // } catch(err) {
      
    // }
    
    function setFontSize() {
      const u = navigator.userAgent;
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
      const isiOS = u.indexOf('iPhone') > -1; //ios终端
      if(isAndroid || isiOS) {
        const windowWidth = document.documentElement.clientWidth;
        document.documentElement.style.fontSize = windowWidth / ratio + 'px';
      } else {
        const windowWidth = document.documentElement.clientWidth;
        if(windowWidth > 540) {
          document.documentElement.style.fontSize = 540 / ratio + 'px';
        } else {
          document.documentElement.style.fontSize = windowWidth / ratio + 'px';
        }
      }
    }
  
    setFontSize();
    window.onresize = function() {
      setFontSize()
    }
    
  })()