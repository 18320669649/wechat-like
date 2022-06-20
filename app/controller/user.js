'use strict';

const Controller = require('egg').Controller;
// const crypto = require('crypto');

class UserController extends Controller {
  // 注册
  async reg() {
    const { app, ctx } = this;
    console.log('ctx', ctx.request.body);
    const { username, password } = ctx.request.body;
    console.log('username', username);
    console.log('password', password);
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        range: {
          min: 5,
          max: 20,
        },
        desc: '用户名',
      },
      password: {
        type: 'string',
        require: true,
        desc: '密码',
      },
      // repassword: {
      //   type: 'string',
      //   required: true,
      //   desc: '确认密码',
      // },
    }, {
      equals: [[ 'password', 'repassword' ]],
    });


    // 验证用户是否存在
    // if(await)
    // ctx.body = {
    //   msg: 'true',
    // };
    ctx.apiSuccess();
  }
}

module.exports = UserController;

