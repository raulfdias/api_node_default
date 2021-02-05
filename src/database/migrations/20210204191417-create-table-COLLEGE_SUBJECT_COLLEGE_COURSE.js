'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('COLLEGE_SUBJECT_COLLEGE_COURSE', {
            csc_fk_college_subject: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'COLLEGE_SUBJECT',
                    key: 'cos_id_college_subject',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            csc_fk_college_course: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'COLLEGE_COURSE',
                    key: 'coc_id_college_course',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            csc_ds_college_semester: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                defaultValue: '1',
                comment: '1 - PRIMEIRO SEMESTRE || 2 - SEGUNDO SEMESTRE || 3 - TERCEIRO SEMESTRE || 4 - QUARTO SEMESTRE || 5 - QUINTO SEMESTRE || 6 - SEXTO SEMESTRE || 7 - SETIMO SEMESTRE || 8 - OITAVO SEMESTRE || 9 - NONO SEMESTRE || 10 - DECIMO SEMESTRE'
            },
            csc_ds_created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            csc_ds_updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('COLLEGE_SUBJECT_COLLEGE_COURSE');
    }
};
