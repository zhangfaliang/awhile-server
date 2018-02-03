const bcrypt = require('bcryptjs');
const randomdata = require('randomdata');
const Service = require('egg').Service;
class EncryptService extends Service {
  async getBrypto(key) {
    return await bcrypt.hashSync(key, bcrypt.genSaltSync());
  }

  // 检验密码
  async checkBrypto(key, hash) {
    return await bcrypt.compareSync(key, hash);
  }

  // 生成密钥
  getSecret() {
    return randomdata.chars(50);
  }
}
module.exports = EncryptService;