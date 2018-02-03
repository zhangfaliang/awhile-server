const Controller = require('../core/baseController')

class UserController extends Controller {
  async info() {
    const { ctx, service } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
}

module.exports = UserController;