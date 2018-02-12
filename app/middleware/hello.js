module.exports = (options, app) => {
  return async function helloMiddleware(ctx, next) {
    if(ctx.status === 404){
      await ctx.render('404.nj', { name: `404呦` });
    }
    await next();
  };
};
