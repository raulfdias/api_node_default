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
            CollegeSubjectCollegeCourse.belongsTo(models.CollegeCourse, { foreignKey: 'csc_fk_college_course' });
            CollegeSubjectCollegeCourse.belongsTo(models.CollegeSubject, { foreignKey: 'csc_fk_college_subject' });
        }
    };

    CollegeSubjectCollegeCourse.init({
        csc_fk_college_subject: {
            type: DataTypes.INTEGER
        },
        csc_fk_college_course: {
            type: DataTypes.INTEGER
        },
        csc_en_college_semester: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'CollegeSubjectCollegeCourse',
        tableName: 'COLLEGE_SUBJECT_COLLEGE_COURSE',
        paranoid: false,
        createdAt: 'csc_dt_created_at',
        updatedAt: 'csc_dt_updated_at'
    });

    return CollegeSubjectCollegeCourse;
};
