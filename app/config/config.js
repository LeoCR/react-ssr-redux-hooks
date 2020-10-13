const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('nodejs_auth', 'root', '79461313', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    underscored: true,
    timestamps: false
},
  port: "3306",
  pool: {
    max: 5000,
    min: 0,
    acquire: 3000000,
    idle: 1000000
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require(path.resolve(__dirname+'/../model/user.model.js'))(sequelize, Sequelize);
module.exports = db;