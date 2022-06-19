'use strict';
module.exports = {
  // api 返回成功
  apiSuccess(data = '', msg = 'ok', code = 200) {
    this.status = 200;
    this.body = { msg, data, code };
  },


};
