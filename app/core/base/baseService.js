const Service = require('egg').Service;
class BaseService extends Service {
  async getCurrentUser() {
    const { ctx } = this;
    const decoded = this.app.jwt.decode(ctx.get('token'));
    return await this.app.mysql.get('user', { id: decoded.userId });
  }

}
module.exports = BaseService;