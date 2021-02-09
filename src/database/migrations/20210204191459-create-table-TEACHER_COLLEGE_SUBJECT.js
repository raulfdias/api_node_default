'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('TEACHER_COLLEGE_SUBJECT', {
            tcs_fk_college_subject: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'COLLEGE_SUBJECT',
                    key: 'cos_id_college_subject',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            tcs_fk_teacher: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'TEACHER',
                    key: 'tea_id_teacher',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            tcs_dt_created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            tcs_dt_updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('TEACHER_COLLEGE_SUBJECT');
    }
};
