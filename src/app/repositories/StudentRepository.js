'use strict';

const { Student } = require('../models');

class StudentRepository {
    async findById(id) {
        return await Student.findByPk((parseInt(id)));
    }

    async listAll({ attributes = [], where = {}, order = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (order.length > 0) options.order = order;

        return await Student.findAll(options);
    }

    async store(data) {
        return await Student.create(data);
    }

    async update(id, data) {
        const student = await this.findById((parseInt(id)));

        if (!student) {
            throw new Error('Não foi possivel encontrar o aluno');
        }

        return await student.update(data);
    }

    async delete(id) {
        const student = await this.findById(id);

        if (!student) {
            throw new Error('Não foi possivel encontrar o aluno');
        }

        return await student.destroy();
    }
}

module.exports = new StudentRepository();
