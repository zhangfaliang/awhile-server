const BaseService = require('../../core/base/baseService');
class MenuService extends BaseService {
  async get() {
   return await this.app.mysql.select('admin_menu');
 }

  async add(params) {
    const result = await this.app.mysql.insert('admin_menu', {...params});

    if (result.affectedRows === 1) {
     return '添加成功'
    }else{
     return '添加失败'
    }
  }
}
module.exports = MenuService;