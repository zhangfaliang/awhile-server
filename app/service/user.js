const Service = require('egg').Service;
class UserService extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('user', { id: uid });
    return user;
  }

  async getUserInfo(username) {
    return await this.app.mysql.get('user', { username });
  }

  async resign({ username, password }) {
    return await this.app.mysql.insert('user', { username, password });
  }
}
module.exports = UserService;