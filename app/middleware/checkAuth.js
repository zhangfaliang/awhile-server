module.exports = (options, app) => {
  return async (ctx, next) => {
    const decoded = ctx.app.jwt.decode(ctx.get('token'));
    if (decoded) {
      const getCurrentUser = await ctx.service.user.getCurrentUser();
      if (getCurrentUser.status === 1) {
        await next();
      } else {
        ctx.body = {
          code: 20000,
          msg: '该用户已被禁用，请联系管理员'
        };
      }
    } else {
      ctx.body = {
        code: 11000,
        msg: 'toekn过期，请重新登录'
      };
    }
  }
}

