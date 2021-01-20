const { Model, DataTypes } = require('sequelize');

class Aluno extends Model {
    static init(sequelize) {
        super.init({
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
    }
}

module.exports = new Aluno();
