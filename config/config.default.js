/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};


  // 关闭CSRF
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:7001' ],
  };
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH',
  };

  // 开启参数验证
  config.valparams = {
    locale: 'zh-cn',
    throwError: true,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1655478074028_3084';

  // add your middleware config here
  // 配置中间件
  config.middleware = [ 'errorHandler' ];


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
