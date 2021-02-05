'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };

    User.init({
        usu_id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        usu_ds_name: {
            type: DataTypes.STRING
        },
        usu_ds_email: {
            type: DataTypes.STRING
        },
        usu_ds_password: {
            type: DataTypes.STRING
        },
        usu_ds_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'TEACHER',
        paranoid: true,
        createdAt: 'usu_ds_created_at',
        updatedAt: 'usu_ds_updated_at',
        deletedAt: 'usu_ds_deleted_at'
    });

    return User;
};
