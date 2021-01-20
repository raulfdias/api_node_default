'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Aluno extends Model { };

    Aluno.init({
        alu_ds_nome: {
            type: DataTypes.STRING
        },
        alu_ds_email: {
            type: DataTypes.STRING
        },
        alu_ds_semestre: {
            type: DataTypes.STRING
        },
        alu_ds_status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Aluno',
        tableName: 'ALUNO'
    });

    return Aluno;
};
