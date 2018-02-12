const Controller = require('../core/base/baseController')

function readonly(target, name, descriptor){
  descriptor.writable = false;
  return descriptor;
}
class HomeController extends Controller {
  async index() {
    const {ctx} = this;
    this.success(ctx.app.cities);
  }
}

module.exports = HomeController;