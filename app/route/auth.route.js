module.exports = function(app,path) {
    var userController = require(path.resolve(__dirname+'/../controller/user.controller.js'));
    app.post('/api/login/byEmail',userController.findUserByEmail);
    app.post('/api/login/byUsername',userController.findUserByUsername);
}