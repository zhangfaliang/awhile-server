const Controller = require('../../core/base/baseController')

class AdminRoleController extends Controller {
  async get() {
    const { ctx } = this;
    const roles = await ctx.service.admin.role.get();
    this.success(roles);
  }

  async add() {
    const { ctx } = this;
    const requestBody = this.requestBody();
    if (!requestBody.name.trim()) {
      return this.fail(11000, '缺少参数');
    }
    const data = await ctx.service.admin.role.add(requestBody);
    this.success(data);
  }
}

module.exports = AdminRoleController;