module.exports = function (sequelize, Sequelize) {
  const Place = sequelize.define("PLACE", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Place;
};
