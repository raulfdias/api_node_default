'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('STUDENT_COLLEGE_COURSE', {
            scc_fk_student: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'STUDENT',
                    key: 'stu_id_student',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            scc_fk_college_course: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'COLLEGE_COURSE',
                    key: 'coc_id_college_course',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            coc_ds_course_period: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['1', '2', '3'],
                defaultValue: '1',
                comment: '1 - MATUTINO || 2 - VESPERTINO || 3 - NOTURNO'
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('STUDENT_COLLEGE_COURSE');
    }
};
