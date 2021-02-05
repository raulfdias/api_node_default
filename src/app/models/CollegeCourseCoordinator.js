'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CollegeCourseCoordinator extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CollegeCourseCoordinator.hasOne(models.CollegeCourse, { foreignKey: 'coc_fk_college_course_coordinator', as: 'college_course' });
        }
    };

    CollegeCourseCoordinator.init({
        ccc_id_college_course_coordinator: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ccc_ds_name: {
            type: DataTypes.STRING
        },
        ccc_ds_email: {
            type: DataTypes.STRING
        },
        ccc_ds_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'CollegeCourseCoordinator',
        tableName: 'COLLEGE_COURSE_COORDINATOR',
        paranoid: true,
        createdAt: 'ccc_ds_created_at',
        updatedAt: 'ccc_ds_updated_at',
        deletedAt: 'ccc_ds_deleted_at'
    });

    return CollegeCourseCoordinator;
};
