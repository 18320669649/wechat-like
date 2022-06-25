'use strict';


const Service = require('egg').Service;

class CacheService extends Service {

  // 设置缓存
  async set(key, value, expir = 0) {
    const { redis } = this.app;
    if (expir === 0) {
      return await redis.set(key, JSON.stringify(value));
    }
    return await redis.set(key, JSON.stringify(value), 'EX', expir);
  }
}

module.exports = CacheService;
