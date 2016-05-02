var Sequelize = require('sequelize');

var Lembrete = Sequelize.define('Lembrete', {
	msg: Sequelize.TEXT,
	freezeTableName: true
});

moduel.exports = Lembrete;