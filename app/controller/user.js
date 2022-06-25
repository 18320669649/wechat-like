'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

class UserController extends Controller {
  // 注册
  async reg() {
    const { app, ctx } = this;
    ctx.validate(
      {
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
      },
      {
        equals: [[ 'password', 'repassword' ]],
      }
    );
    const { username, password } = ctx.request.body;
    // 验证用户是否存在
    if (
      await app.model.User.findOne({
        where: {
          username,
        },
      })
    ) {
      ctx.throw(400, '用户名已存在');
    }

    // 创建用户
    const user = await app.model.User.create({
      username,
      password,
    });
    if (!user) ctx.throw(400, '创建用户失败');
    ctx.apiSuccess(user);
  }

  // 登录
  async login() {
    const { app, ctx } = this;
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        desc: '用户名',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
    });

    const { username, password } = ctx.request.body;
    let user = await app.model.User.findOne({
      where: { username, status: 1 },
    });
    if (!user) ctx.throw('用户不存在或已被禁用');
    // 验证密码
    await this.checkPassword(password, user.password);

    user = JSON.parse(JSON.stringify(user));
    const token = ctx.getToken(user);

    user.token = token;
    delete user.password;
    // 加入缓存中，通过redis
    if (!await this.service.cache.set('user_' + user.id, token)) {
      ctx.throw(400, '登录失败');
    }
    return ctx.apiSuccess(user);
  }


  async checkPassword(password, hash_password) {
    console.log('password', password);
    const hmac = crypto.createHmac('sha256', this.app.config.crypto.secret);
    hmac.update(password);
    password = hmac.digest('hex');
    console.log('password', password);
    console.log('hash_password', hash_password);
    if (password !== hash_password) {
      this.ctx.throw(400, '密码错误');
    }
    return true;
  }

}

module.exports = UserController;
