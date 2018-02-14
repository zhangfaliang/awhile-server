module.exports = app => {
  const { router, controller, middleware } = app;
  // const authRole = middleware.authAccess();
  router.post('/admin/setting/password', controller.admin.setting.password);
};