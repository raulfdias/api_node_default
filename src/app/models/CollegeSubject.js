'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CollegeSubject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CollegeSubject.belongsToMany(models.CollegeCourse, { through: 'CollegeSubjectCollegeCourse', foreignKey: 'csc_fk_college_subject', as: 'college_courses' });
            CollegeSubject.belongsToMany(models.Teacher, { through: 'TeacherCollegeSubject', foreignKey: 'tcs_fk_college_subject', as: 'teachers' });
        }
    };

    CollegeSubject.init({
        cos_id_college_subject: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        cos_ds_name: {
            type: DataTypes.STRING
        },
        cos_en_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'CollegeSubject',
        tableName: 'COLLEGE_SUBJECT',
        paranoid: true,
        createdAt: 'cos_dt_created_at',
        updatedAt: 'cos_dt_updated_at',
        deletedAt: 'cos_dt_deleted_at'
    });

    return CollegeSubject;
};
