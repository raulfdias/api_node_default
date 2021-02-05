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
            // define association here
        }
    };

    Teacher.init({
        tea_id_teacher: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        tea_ds_name: {
            type: DataTypes.STRING
        },
        tea_ds_email: {
            type: DataTypes.STRING
        },
        tea_ds_college_semester: {
            type: DataTypes.STRING
        },
        tea_ds_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Teacher',
        tableName: 'TEACHER',
        paranoid: true,
        createdAt: 'tea_ds_created_at',
        updatedAt: 'tea_ds_updated_at',
        deletedAt: 'tea_ds_deleted_at'
    });

    return Teacher;
};
