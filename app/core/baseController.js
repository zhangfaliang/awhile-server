const { Controller } = require('egg');
class BaseController extends Controller {
  constructor(ctx){
    super(ctx);
    console.log(ctx.request,'===')
  }
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
}
module.exports = BaseController;