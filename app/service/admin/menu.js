const BaseService = require('../../core/base/baseService');
class MenuService extends BaseService {
  async get() {
    const data = await this.app.mysql.select('admin_menu');
    return this.arr_to_tree(data, 0);
  }

  arr_to_tree(data, parentId) {
    let result = [], temp;
    const length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i].parent_id == parentId) {
        result.push(data[i]);
        temp = this.arr_to_tree(data, data[i].id);
        if (temp.length > 0) {
          data[i].children = temp;
          data[i].chnum = data[i].children.length;
        }
      }
    }
    return result;
  }

  async add(params) {
    const result = await this.app.mysql.insert('admin_menu', { ...params });

    if (result.affectedRows === 1) {
      return '添加成功'
    } else {
      return '添加失败'
    }
  }

  async update(params) {
    const result = await this.app.mysql.update('admin_menu', { ...params });
    if (result.affectedRows === 1) {
      return '更新成功'
    } else {
      return '更新失败'
    }
  }

  async delete(params) {
    const result = await this.app.mysql.delete('admin_menu', { ...params });
    if (result.affectedRows === 1) {
      return '删除成功'
    } else {
      return '删除失败'
    }
  }
}
module.exports = MenuService;