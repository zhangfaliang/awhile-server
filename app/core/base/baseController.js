const { Controller } = require('egg');
class BaseController extends Controller {

  requestBody() {
    return this.ctx.request.body;
  }
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }

  fail(code, msg) {
    this.ctx.body = {
      code,
      msg,
    };
  }

  validatorToken(token) {
    return this.app.jwt.decode(token);
  }
}
module.exports = BaseController;