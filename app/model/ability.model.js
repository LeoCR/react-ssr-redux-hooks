module.exports = function(sequelize, Sequelize) {
    var Ability = sequelize.define('ABILITY', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        effect: {
            type: Sequelize.STRING
        },
        id_ability: {
            type: Sequelize.INTEGER
        }
    });
    return Ability;
}