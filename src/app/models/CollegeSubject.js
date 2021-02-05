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
            // define association here
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
        cos_ds_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'CollegeSubject',
        tableName: 'COLLEGE_SUBJECT',
        paranoid: true,
        createdAt: 'cos_ds_created_at',
        updatedAt: 'cos_ds_updated_at',
        deletedAt: 'cos_ds_deleted_at'
    });

    return CollegeSubject;
};
