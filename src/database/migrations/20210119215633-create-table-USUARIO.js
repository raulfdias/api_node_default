'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('USUARIO', {
            usu_id_usuario: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
                unique: true
            },
            usu_ds_nome: {
                allowNull: false,
                type: Sequelize.STRING(125)
            },
            usu_ds_email: {
                allowNull: false,
                type: Sequelize.STRING(125),
                unique: true
            },
            usu_ds_senha: {
                allowNull: false,
                type: Sequelize.STRING(255)
            },
            usu_ds_status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['0', '1'],
                defaultValue: '1'
            },
            created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('USUARIO');
    }
};
