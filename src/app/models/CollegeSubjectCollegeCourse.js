'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CollegeSubjectCollegeCourse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };

    CollegeSubjectCollegeCourse.init({
        csc_fk_college_subject: {
            type: DataTypes.BIGINT
        },
        csc_fk_college_course: {
            type: DataTypes.BIGINT
        },
        csc_ds_college_semester: {
            type: DataTypes.BIGINT
        }
    }, {
        sequelize,
        modelName: 'CollegeSubjectCollegeCourse',
        tableName: 'COLLEGE_SUBJECT_COLLEGE_COURSE',
        paranoid: false,
        createdAt: 'csc_ds_created_at',
        updatedAt: 'csc_ds_updated_at'
    });

    return CollegeSubjectCollegeCourse;
};
