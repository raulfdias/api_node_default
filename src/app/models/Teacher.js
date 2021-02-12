'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Teacher.belongsToMany(models.CollegeSubject, { through: 'TeacherCollegeSubject', foreignKey: 'tcs_fk_teacher', as: 'college_subjects' });
        }
    };

    Teacher.init({
        tea_id_teacher: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tea_ds_name: {
            type: DataTypes.STRING
        },
        tea_ds_email: {
            type: DataTypes.STRING
        },
        tea_en_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Teacher',
        tableName: 'TEACHER',
        paranoid: true,
        createdAt: 'tea_dt_created_at',
        updatedAt: 'tea_dt_updated_at',
        deletedAt: 'tea_dt_deleted_at'
    });

    return Teacher;
};
