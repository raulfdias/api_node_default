'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('STUDENT', {
            stu_id_student: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
                unique: true
            },
            stu_ds_name: {
                allowNull: false,
                type: Sequelize.STRING(125)
            },
            stu_ds_email: {
                allowNull: false,
                type: Sequelize.STRING(125),
                unique: true
            },
            stu_ds_college_semester: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                defaultValue: '1'
            },
            stu_ds_status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['0', '1'],
                defaultValue: '1'
            },
            stu_ds_created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            stu_ds_updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            stu_ds_deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('STUDENT');
    }
};
