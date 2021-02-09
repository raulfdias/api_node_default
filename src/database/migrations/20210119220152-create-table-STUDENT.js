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
                type: Sequelize.STRING(200)
            },
            stu_ds_email: {
                allowNull: false,
                type: Sequelize.STRING(200),
                unique: true
            },
            stu_en_college_semester: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                defaultValue: '1',
                comment: '1 - PRIMEIRO SEMESTRE || 2 - SEGUNDO SEMESTRE || 3 - TERCEIRO SEMESTRE || 4 - QUARTO SEMESTRE || 5 - QUINTO SEMESTRE || 6 - SEXTO SEMESTRE || 7 - SETIMO SEMESTRE || 8 - OITAVO SEMESTRE || 9 - NONO SEMESTRE || 10 - DECIMO SEMESTRE'
            },
            stu_en_status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['0', '1'],
                defaultValue: '1',
                comment: '0 - INATIVO || 1 - ATIVO'
            },
            stu_dt_created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            stu_dt_updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            stu_dt_deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('STUDENT');
    }
};
