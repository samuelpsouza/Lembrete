'use strict';

module.exports = (sequelize, DataTypes) => {
	const Lembrete = sequelize.define('Lembrete', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		titulo: DataTypes.STRING,
		mensagem: DataTypes.STRING,
	});

	Lembrete.associate = (models) => {
		models.Lembrete.hasOne(models.Usuario, { as: 'id_usuario' });
	};

	return Lembrete;
};
