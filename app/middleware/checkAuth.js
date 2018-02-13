module.exports = (options, app) => {
  return async (ctx, next) => {
    const decoded = ctx.app.jwt.decode(ctx.get('token'));
    if (decoded) {
      await next();
    } else {
      ctx.body = {
        code: 11000, 
        msg: 'toekn过期，请重新登录'
      };
    }
  }
}

