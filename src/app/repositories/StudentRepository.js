'use strict';

const { Student } = require('../models');

const APIException = require('../exceptions/APIException');

class StudentRepository {
    async findById(id, include = []) {
        return await Student.findByPk((parseInt(id)), { include });
    }

    async findFirst({ attributes = [], where = {}, order = [], include = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await Student.findOne(options);
    }

    async listAll({ attributes = [], where = {}, order = [], include = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await Student.findAll(options);
    }

    async store(data) {
        return await Student.create(data);
    }

    async update(id, data) {
        const student = await this.findById((parseInt(id)));

        if (!student) {
            throw new APIException('Não foi possivel encontrar o aluno', 404);
        }

        return await student.update(data);
    }

    async delete(id) {
        const student = await this.findById(id);

        if (!student) {
            throw new APIException('Não foi possivel encontrar o aluno', 404);
        }

        return await student.destroy();
    }

    async getAllCollegeCourseFromStudent(id) {
        const sutdent = await this.findById(id, ['college_courses']);

        return sutdent.college_courses;
    }
}

module.exports = new StudentRepository();
