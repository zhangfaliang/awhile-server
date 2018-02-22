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

  async update(params) {
    const result = await this.app.mysql.update('role', { ...params });
    if (result.affectedRows === 1) {
      return '更新成功'
    } else {
      return '更新失败'
    }
  }

  async delete(params) {
    const result = await this.app.mysql.delete('role', { ...params });
    if (result.affectedRows === 1) {
      return '删除成功'
    } else {
      return '删除失败'
    }
  }
}

module.exports = RoleService;