module.exports = app => {
  const { router, controller, middleware } = app;
  const checkAuth = middleware.checkAuth();
  const authRole = middleware.authAccess();
  router.post('/admin/setting/password', checkAuth, authRole, controller.admin.setting.password);
};