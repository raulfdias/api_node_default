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
            // define association here
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
        stu_ds_college_semester: {
            type: DataTypes.STRING
        },
        stu_ds_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Student',
        tableName: 'STUDENT',
        paranoid: true,
        createdAt: 'stu_ds_created_at',
        updatedAt: 'stu_ds_updated_at',
        deletedAt: 'stu_ds_deleted_at'
    });

    return Student;
};