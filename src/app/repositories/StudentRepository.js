'use strict';

const { Student } = require('../models');

const APIException = require('../exceptions/APIException');

class StudentRepository {
    async findById(id, { include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (include.length > 0) options.include = include;

        return await Student.findByPk((parseInt(id)), options);
    }

    async findFirst({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await Student.findOne(options);
    }

    async listAll({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await Student.findAll(options);
    }

    async store(data, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        return await Student.create(data, options);
    }

    async update(id, data, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const student = await this.findById((parseInt(id)));
        if (!student) {
            throw new APIException('Não foi possivel encontrar o aluno', 404);
        }

        return await student.update(data, options);
    }

    async delete(id, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const student = await this.findById(id, options);
        if (!student) {
            throw new APIException('Não foi possivel encontrar o aluno', 404);
        }

        return await student.destroy({ transaction });
    }

    async getAllCollegeCourseFromStudent(id, { transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        options.include = ['college_courses'];

        const sutdent = await this.findById(id, options);

        return sutdent.college_courses;
    }
}

module.exports = new StudentRepository();
