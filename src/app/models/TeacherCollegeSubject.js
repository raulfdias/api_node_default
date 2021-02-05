'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TeacherCollegeSubject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    TeacherCollegeSubject.init({
        tcs_fk_college_subject: {
            type: DataTypes.INTEGER
        },
        tcs_fk_teacher: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'TeacherCollegeSubject',
        tableName: 'TEACHER_COLLEGE_SUBJECT',
        paranoid: false,
        createdAt: 'tcs_ds_created_at',
        updatedAt: 'tcs_ds_updated_at'
    });

    return TeacherCollegeSubject;
};
