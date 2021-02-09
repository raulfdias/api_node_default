'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CollegeCourse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CollegeCourse.belongsTo(models.CollegeCourseCoordinator, { foreignKey: 'coc_fk_college_course_coordinator', as: 'college_course_coordinator' });
            CollegeCourse.belongsToMany(models.CollegeSubject, { through: 'CollegeSubjectCollegeCourse', foreignKey: 'csc_fk_college_course', as: 'college_subjects' });
            CollegeCourse.belongsToMany(models.Student, { through: 'StudentCollegeCourse', foreignKey: 'scc_fk_college_course', as: 'students' });
        }
    };

    CollegeCourse.init({
        coc_id_college_course: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        coc_fk_college_course_coordinator: {
            type: DataTypes.INTEGER
        },
        coc_ds_name: {
            type: DataTypes.STRING
        },
        coc_en_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'CollegeCourse',
        tableName: 'COLLEGE_COURSE',
        paranoid: true,
        createdAt: 'coc_dt_created_at',
        updatedAt: 'coc_dt_updated_at',
        deletedAt: 'coc_dt_deleted_at'
    });

    return CollegeCourse;
};
