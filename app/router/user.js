module.exports = app => {
  const { router, controller } = app;
  router.get('/user/profile', controller.user.profile); //用户信息
  router.post('/user/login', controller.user.login); // 用户登录
  router.post('/user/resign', controller.user.resign); // 用户注册
  router.post('/user/alogin', controller.user.adminLogin); // 管理登录
};