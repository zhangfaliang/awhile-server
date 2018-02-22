const BaseService = require('../../core/base/baseService');
class RoleService extends BaseService {
  async get() {
    return await this.app.mysql.select('role');
  }

  async add(params) {
    const _nowT = new Date().getTime();
    params.create_time = _nowT;
    params.update_time = _nowT;

    const result = await this.app.mysql.insert('role', { ...params });
    if (result.affectedRows === 1) {
      return '添加成功'
    } else {
      return '添加失败'
    }
  }
}

module.exports = RoleService;