module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  app.router.get('/user/:id', app.controller.user.info);
};