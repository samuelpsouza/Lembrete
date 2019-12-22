'use strict';

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING, unique: true
        },
        password: Sequelize.STRING,
    });

    return Usuario;
};