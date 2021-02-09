'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('USER', {
            usu_id_user: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
                unique: true
            },
            usu_ds_name: {
                allowNull: false,
                type: Sequelize.STRING(200)
            },
            usu_ds_email: {
                allowNull: false,
                type: Sequelize.STRING(200),
                unique: true
            },
            usu_ds_password: {
                allowNull: false,
                type: Sequelize.STRING(255)
            },
            usu_en_status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['0', '1'],
                defaultValue: '1',
                comment: '0 - INATIVO || 1 - ATIVO'
            },
            usu_dt_created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            usu_dt_updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            usu_dt_deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('USER');
    }
};
