const Service = require('egg').Service;
class UserService extends Service {
  async find(id) {
    return await this.app.mysql.get('user', { id: id });
  }

  async getCurrentUser(){
    const {ctx} = this;
    const decoded = this.app.jwt.decode(ctx.get('token'));
    return this.find(decoded.userId);
  }

  async getUserInfo(username) {
    return await this.app.mysql.get('user', { username });
  }

  async resign(data) {
    return await this.app.mysql.insert('user', { ...data });
  }

  async saveUserToken(userData) {
    return await this.app.mysql.insert('user_token', { ...userData });
  }

  async checkUserToken(userId) {
    return await this.app.mysql.get('user_token', { user_id: userId });
  }

  async updateUserToken(userData) {
    const row = {
      id: userData.user_id,
      last_login_time: new Date().getTime(),
    };
    await this.app.mysql.update('user', { ...row })
    return await this.app.mysql.update('user_token', { ...userData });
  }

}
module.exports = UserService;