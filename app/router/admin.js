module.exports = app => {
  const { router, controller, middleware } = app;
  // const authRole = middleware.authAccess();
  router.post('/admin/setting/password', controller.admin.setting.password);
  router.get('/admin/menu/get', controller.admin.menu.get);
  router.post('/admin/menu/add', controller.admin.menu.add);
};