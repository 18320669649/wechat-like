'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 开启跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 开启参数验证
  valparams: {
    enable: true,
    package: 'egg-valparams',
  },
};
