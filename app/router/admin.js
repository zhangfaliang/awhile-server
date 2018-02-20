module.exports = app => {
  const { router, controller, middleware } = app;
  router.post('/admin/setting/password', controller.admin.setting.password);
  router.get('/admin/menu/get', controller.admin.menu.get);
  router.post('/admin/menu/add', controller.admin.menu.add);
  router.post('/admin/menu/edit', controller.admin.menu.edit);
  router.post('/admin/menu/delete', controller.admin.menu.delete);
};