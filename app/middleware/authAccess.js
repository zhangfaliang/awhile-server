const {
  findIndex
} = require('lodash')

module.exports = (options, app) => {
  return async (ctx, next) => {
    const getCurrentUserAuthAccess = await ctx.service.authAccess.getCurrentUserAuthAccess();
    // todo 
    // 当前用户分配的角色是否禁用 ---> 401
    // next()
    const getCurrentUser = await ctx.service.user.getCurrentUser();
    if (findIndex(getCurrentUserAuthAccess, item => item.action === ctx.url) > -1 && getCurrentUser.type === 1 ||
      getCurrentUser.id === 1
    ) {
      await next();
    } else {
      ctx.body = {
        code: 20001,
        msg: '没有权限'
      }
    }
  }
};