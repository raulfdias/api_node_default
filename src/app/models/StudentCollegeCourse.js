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
            StudentCollegeCourse.belongsTo(models.Student, { foreignKey: 'scc_fk_student' });
            StudentCollegeCourse.belongsTo(models.CollegeCourse, { foreignKey: 'scc_fk_college_course' });
        }
    };

    StudentCollegeCourse.init({
        scc_fk_student: {
            type: DataTypes.INTEGER
        },
        scc_fk_college_course: {
            type: DataTypes.INTEGER
        },
        scc_en_course_period: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'StudentCollegeCourse',
        tableName: 'STUDENT_COLLEGE_COURSE',
        paranoid: false,
        createdAt: 'scc_dt_created_at',
        updatedAt: 'scc_dt_updated_at'
    });

    return StudentCollegeCourse;
};
