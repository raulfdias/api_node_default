'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('COLLEGE_COURSE_COORDINATOR', {
            ccc_id_college_course_coordinator: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
                unique: true
            },
            ccc_ds_name: {
                allowNull: false,
                type: Sequelize.STRING(200)
            },
            ccc_ds_email: {
                allowNull: false,
                type: Sequelize.STRING(200),
                unique: true
            },
            ccc_ds_status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['0', '1'],
                defaultValue: '1',
                comment: '0 - INATIVO || 1 - ATIVO'
            },
            ccc_ds_created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            ccc_ds_updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            ccc_ds_deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('COLLEGE_COURSE_COORDINATOR');
    }
};
