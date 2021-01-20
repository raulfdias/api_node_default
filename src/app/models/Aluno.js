const { Model, DataTypes } = require('sequelize')


class Aluno extends Model {
    static init(sequelize) {
        super.init({
            alu_ds_nome: DataTypes.STRING,
            alu_ds_email: DataTypes.STRING,
            alu_ds_semestre: DataTypes.STRING,
            alu_ds_status: DataTypes.STRING,
        }, { sequelize })
    }
}

module.exports = new Aluno()
