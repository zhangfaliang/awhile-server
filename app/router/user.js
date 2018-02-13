module.exports = app => {
  const { router, controller, middleware } = app;
  const checkAuth = middleware.checkAuth();
  router.get('/user/profile', checkAuth, controller.user.profile); //用户信息
  router.post('/user/login', controller.user.login); // 登录
  router.post('/user/resign', controller.user.resign); // 注册
};