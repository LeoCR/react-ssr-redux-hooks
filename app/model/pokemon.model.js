module.exports = function (sequelize, Sequelize) {
  const Pokemon = sequelize.define("POKEMON", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING,
    },
    weight: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
    id_pokemon: {
      type: Sequelize.INTEGER,
    },
  });
  return Pokemon;
};
