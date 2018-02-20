const Controller = require('../../core/base/baseController')

class AdminMenuController extends Controller {
  async get() {
    const { ctx } = this;
    const getCurrentUser = await ctx.service.user.getCurrentUser();
    const getCurrentUserAuthAccess = await ctx.service.authAccess.getCurrentUserAuthAccess();
    const getAllMenu = await ctx.service.admin.menu.get();
    if (getCurrentUser.id === 1) {
      this.success(getAllMenu);
    } else {
      this.success(getCurrentUserAuthAccess);
    }
  }

  async add() {
    const { ctx, app, service } = this;
    const requestBody = this.requestBody();
    if (!requestBody.parent_id || !requestBody.name.trim() || !requestBody.action.trim()) {
      return this.fail(11000, '缺少参数');
    }
    const data = await ctx.service.admin.menu.add(requestBody);
    this.success(data);
  }

  async edit() {
    const { ctx, app, service } = this;
    const requestBody = this.requestBody();
    if (!requestBody.parent_id || !requestBody.name.trim() || !requestBody.action.trim()) {
      return this.fail(11000, '缺少参数');
    }
    const data = await ctx.service.admin.menu.update(requestBody);
    this.success(data);
  }

  async delete() {
    const { ctx, app, service } = this;
    const requestBody = this.requestBody();
    if (!requestBody.id) {
      return this.fail(11000, '缺少参数');
    }
    const data = await ctx.service.admin.menu.delete(requestBody);
    this.success(data);
  }
}

module.exports = AdminMenuController;