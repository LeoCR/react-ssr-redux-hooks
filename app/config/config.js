require("dotenv").config();
const Sequelize = require("sequelize");
const path = require("path");
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    },
    port: "3306",
    pool: {
      max: 500,
      min: 0,
      acquire: 3000000,
      idle: 1000000,
    },
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require(path.resolve(__dirname + "/../model/user.model.js"))(
  sequelize,
  Sequelize
);
db.pokemon = require(path.resolve(__dirname + "/../model/pokemon.model.js"))(
  sequelize,
  Sequelize
);
db.ability = require(path.resolve(__dirname + "/../model/ability.model.js"))(
  sequelize,
  Sequelize
);
db.place = require(path.resolve(__dirname + "/../model/place.model.js"))(
  sequelize,
  Sequelize
);

db.user.belongsToMany(db.pokemon, {
  through: "USER_POKEMON",
  as: "pokemons_of_users",
  foreignKey: "id_user",
});
db.pokemon.belongsToMany(db.user, {
  through: "USER_POKEMON",
  as: "users_of_pokedex",
  foreignKey: "id_pokemon",
});

db.ability.belongsToMany(db.pokemon, {
  through: "ABILITY_POKEMON",
  as: "abilities_of_pokemons",
  foreignKey: "id_ability",
});
db.pokemon.belongsToMany(db.ability, {
  through: "ABILITY_POKEMON",
  as: "pokemon_abilities",
  foreignKey: "id_pokemon",
});

db.place.belongsToMany(db.pokemon, {
  through: "PLACE_POKEMON",
  as: "places_of_pokemons",
  foreignKey: "id_place",
});
db.pokemon.belongsToMany(db.place, {
  through: "PLACE_POKEMON",
  as: "pokemon_places",
  foreignKey: "id_pokemon",
});
module.exports = db;
