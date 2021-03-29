'use strict';

const { Teacher } = require('../models');

const APIException = require('../exceptions/APIException');

class TeacherRepository {
    async findById(id, { include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (include.length > 0) options.include = include;

        return await Teacher.findByPk((parseInt(id)), options);
    }

    async findFirst({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await Teacher.findOne(options);
    }

    async listAll({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await Teacher.findAll(options);
    }

    async store(data, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        return await Teacher.create(data, options);
    }

    async update(id, data, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const teacher = await this.findById((parseInt(id)));
        if (!teacher) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        return await teacher.update(data, options);
    }

    async delete(id, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const teacher = await this.findById(id, options);
        if (!teacher) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        return await teacher.destroy(options);
    }

    async getAllCollegeSubjectsFromTeacher(id, { transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        options.include = ['college_subjects'];

        const teacher = await this.findById(id, options);
        if (!teacher) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        return teacher.college_subjects;
    }
}

module.exports = new TeacherRepository();
