module.exports = function (app, path) {
  const userController = require(path.resolve(
    __dirname + "/../controller/user.controller.js"
  ));
  app.post("/api/login/byEmail", userController.findUserByEmail);
  app.post("/api/login/byUsername", userController.findUserByUsername);
  app.post("/api/create/user", userController.createUser);
};
