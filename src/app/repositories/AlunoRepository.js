const { Aluno } = require('../models');

class AlunoRepository {
    async findById(id) {
        return await Aluno.findByPk(id);
    }

    async findAll(attributes = ['*'], where = {}, order = []) {
        return await Aluno.findAll({
            attributes,
            order,
            where
        });
    }

    async create(data) {
        return await Aluno.create(data);
    }

    async update(id, data) {
        const aluno = await this.findById(id);

        if (!aluno) {
            throw new Error('Não foi possivel encontrar o aluno');
        }

        return aluno.save();
    }

    async destroy(id) {
        console.log(id);
    }
}

module.exports = new AlunoRepository();
