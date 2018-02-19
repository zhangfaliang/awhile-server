const Service = require('egg').Service;
class AuthAccessService extends Service {
  async getCurrentUserAuthAccess() {
    const user = await this.ctx.service.user.getCurrentUser();
    return [{action:'/admin/menu/get'}]
  }
}
module.exports = AuthAccessService;