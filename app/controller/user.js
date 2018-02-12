const Controller = require('../core/base/baseController')

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async login() {
    const { ctx, app, service } = this;
    const { username, password } = this.requestBody();
    if (!username || !password) {
      return this.fail(10000, '用户名或密码不能为空');
    }

    const userInfo = await ctx.service.user.getUserInfo(username);

    if (!userInfo) {
      return this.fail(10001, '登录失败，该用户名未注册');
    }
    const passwordBrypto = userInfo.password;

    if (await service.encrypt.checkBrypto(password, passwordBrypto)) {
      const _now = new Date();
      const _nowT = _now.getTime();
      const _expireT = _nowT + 1000 * 60 * 60 * 24 * 7;

      const token = this.app.jwt.sign({
        exp: _expireT,
        userId: userInfo.id
      }, 'secret');

      const _userData = {
        user_id: userInfo.id,
        create_time: _nowT,
        expire_time: _expireT,
        token,
      };
      const userTokenOld = await this.service.user.checkUserToken(userInfo.id);
      if (userTokenOld) {
        const result = await this.service.user.updateUserToken({ id: userTokenOld.id, ..._userData });
        if (result.affectedRows === 1) {
          const userTokenNew = await this.service.user.checkUserToken(userInfo.id);
          ctx.set('token', userTokenNew.token);
          this.success({ token: userTokenNew.token });
        }
      } else {
        const userToken = await this.service.user.saveUserToken(_userData);
        ctx.set('token', userToken.token);
        this.success({ token: userToken.token });
      }
    } else {
      this.fail(10005, '密码错误')
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
    const time = new Date().getTime();
    await this.service.user.resign({
      username,
      password: passwordEncrypt,
      create_time: time,
      last_login_time: time,
    });

    this.success('注册成功');
  }

  async profile() {
    const { ctx, service } = this;
    const decoded = this.validatorToken(ctx.get('token'));
    if (!decoded) {
      this.fail(11000, 'toekn过期，请重新登录');
    } else {
      const userInfo = await ctx.service.user.find(decoded.userId);
      this.success({
        username: userInfo.username,
        avatar: userInfo.avatar
      });
    };
  };
}

module.exports = UserController;