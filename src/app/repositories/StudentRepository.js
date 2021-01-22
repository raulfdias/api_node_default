const { Student } = require('../models');

class StudentRepository {
    async findById(id) {
        return await Student.findByPk(id);
    }

    async findAll(attributes = ['*'], where = {}, order = []) {
        return await Student.findAll({
            attributes,
            order,
            where
        });
    }

    async create(data) {
        return await Student.create(data);
    }

    async update(id, data) {
        const student = await this.findById(id);

        if (!student) {
            throw new Error('Não foi possivel encontrar o aluno');
        }

        return student.save();
    }

    async destroy(id) {
        console.error('Method not implemented');
    }
}

module.exports = new StudentRepository();
