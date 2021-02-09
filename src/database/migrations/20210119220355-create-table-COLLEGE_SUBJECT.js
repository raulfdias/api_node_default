'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('COLLEGE_SUBJECT', {
            cos_id_college_subject: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
                unique: true
            },
            cos_ds_name: {
                allowNull: false,
                type: Sequelize.STRING(200)
            },
            cos_en_status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['0', '1'],
                defaultValue: '1',
                comment: '0 - INATIVO || 1 - ATIVO'
            },
            cos_dt_created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            cos_dt_updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            cos_dt_deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('COLLEGE_SUBJECT');
    }
};
