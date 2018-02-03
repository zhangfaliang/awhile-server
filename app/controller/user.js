const Controller = require('../core/baseController')

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async login() {
    const { username, password } = this.requestBody();
    if (!username || !password) {
      return this.fail(10000, '用户名或密码不能为空');
    }

    const userInfo = await ctx.service.user.find(userId);

    if (!userInfo) {
      return this.fail(10001, '登录失败，该用户名未注册');
    }

  }

  async resign() {
    const { username, password } = this.requestBody();
    if (!password || password.length < 6) {
      return this.fail(10003, '密码不能为空或密码位数小于6位');
    }
    const checkRepeat = await this.service.user.getUserInfo(username);
    if (checkRepeat) {
      return this.fail(10004, '该用户已注册')
    }
    const passwordEncrypt = await this.service.encrypt.getBrypto(password);

    await this.service.user.resign({
      username,
      password: passwordEncrypt,
    });

    this.success('注册成功');
  }

  async info() {
    const { ctx, service } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    const csrftoken = ctx.cookies.get('csrfToken');
    ctx.set('x-csrf-token', csrftoken);
    console.log(csrftoken, 222222222222)
    if (userInfo) {
      this.success(userInfo);
    } else {
      this.fail(10000, '查无此人');
    }
    // ctx.body = userInfo;
  }
}

module.exports = UserController;