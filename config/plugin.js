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

  // jwt 验证
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  // sequelize 配置
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  // redis 缓存
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
