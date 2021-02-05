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
            // define association here
        }
    };

    CollegeCourse.init({
        coc_id_college_course: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        coc_ds_name: {
            type: DataTypes.STRING
        },
        coc_ds_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'CollegeCourse',
        tableName: 'COLLEGE_COURSE',
        paranoid: true,
        createdAt: 'coc_ds_created_at',
        updatedAt: 'coc_ds_updated_at',
        deletedAt: 'coc_ds_deleted_at'
    });

    return CollegeCourse;
};
