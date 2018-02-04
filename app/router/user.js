module.exports = app => {
  const { router, controller } = app;
  router.get('/user/profile', controller.user.profile); //用户信息
  router.post('/user/login', controller.user.login); // 登录
  router.post('/user/resign', controller.user.resign); // 注册
};