'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Student.belongsToMany(models.CollegeCourse, { through: 'StudentCollegeCourse', foreignKey: 'scc_fk_student', as: 'college_courses' });
        }
    };

    Student.init({
        stu_id_student: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        stu_ds_name: {
            type: DataTypes.STRING
        },
        stu_ds_email: {
            type: DataTypes.STRING
        },
        stu_en_college_semester: {
            type: DataTypes.STRING
        },
        stu_en_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Student',
        tableName: 'STUDENT',
        paranoid: true,
        createdAt: 'stu_dt_created_at',
        updatedAt: 'stu_dt_updated_at',
        deletedAt: 'stu_dt_deleted_at'
    });

    return Student;
};
