const Controller = require('../../core/base/baseController')

class AdminSettingController extends Controller {
  async password() {
    const { ctx } = this;
    this.success(ctx.app.cities);
  }
}

module.exports = AdminSettingController;