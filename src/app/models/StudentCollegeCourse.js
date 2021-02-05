'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StudentCollegeCourse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };

    StudentCollegeCourse.init({
        scc_fk_student: {
            type: DataTypes.INTEGER
        },
        scc_fk_college_course: {
            type: DataTypes.INTEGER
        },
        scc_ds_course_period: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'StudentCollegeCource',
        tableName: 'STUDENT_COLLEGE_COURSE',
        paranoid: false,
        createdAt: 'scc_ds_created_at',
        updatedAt: 'scc_ds_updated_at'
    });

    return StudentCollegeCourse;
};
