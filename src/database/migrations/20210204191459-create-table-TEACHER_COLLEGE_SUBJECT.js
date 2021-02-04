'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('TEACHER_COLLEGE_COURSE', {
            tcc_fk_college_subject: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'COLLEGE_SUBJECT',
                    key: 'cos_id_college_subject',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            tcc_fk_teacher: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'TEACHER',
                    key: 'tea_id_teacher',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('TEACHER_COLLEGE_COURSE');
    }
};
