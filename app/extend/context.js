'use strict';
module.exports = {
  // api 返回成功
  apiSuccess(data = '', msg = 'ok', code = 200) {
    this.status = 200;
    this.body = { msg, data, code };
  },

  // api 返回失败
  apiFail(data = '', msg = 'fail', code = 400) {
    this.body = { msg, data };
    this.status = code;
  },

  // 生成token
  getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret);
  },

  // 验证token
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  },


};
