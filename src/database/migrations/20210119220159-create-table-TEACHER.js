'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TEACHER', {
            tea_id_teacher: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
                unique: true
            },
            tea_ds_name: {
                allowNull: false,
                type: Sequelize.STRING(200)
            },
            tea_ds_email: {
                allowNull: false,
                type: Sequelize.STRING(200),
                unique: true
            },
            tea_en_status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['0', '1'],
                defaultValue: '1',
                comment: '0 - INATIVO || 1 - ATIVO'
            },
            tea_dt_created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            tea_dt_updated_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
            tea_dt_deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('TEACHER');
    }
};
