'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('COLLEGE_COURSE', {
            coc_id_college_course: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
                unique: true
            },
            coc_ds_nome: {
                allowNull: false,
                type: Sequelize.STRING(125)
            },
            coc_ds_status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['0', '1'],
                defaultValue: '1'
            },
            coc_ds_created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            coc_ds_updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            coc_ds_deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('COLLEGE_COURSE');
    }
};
