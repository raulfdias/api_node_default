'use strict';

const { CollegeCourse } = require('../models');

const APIException = require('../exceptions/APIException');

class CollegeCourseRepository {
    async findById(id, { include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (include.length > 0) options.include = include;

        return await CollegeCourse.findByPk((parseInt(id)), options);
    }

    async findFirst({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await CollegeCourse.findOne(options);
    }

    async listAll({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await CollegeCourse.findAll(options);
    }

    async store(data, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        return await CollegeCourse.create(data, options);
    }

    async update(id, data, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const collegeCourse = await this.findById((parseInt(id)));
        if (!collegeCourse) {
            throw new APIException('Não foi possivel encontrar o cruso', 404);
        }

        return await collegeCourse.update(data, options);
    }

    async delete(id, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const collegeCourse = await this.findById(id, options);
        if (!collegeCourse) {
            throw new APIException('Não foi possivel encontrar o curso', 404);
        }

        return await collegeCourse.destroy({ transaction });
    }

    async getAllCollegeSubjectsFromCourse(id, { transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        options.include = ['college_subjects'];

        const collegeCourse = await this.findById(id, options);
        if (!collegeCourse) {
            throw new APIException('Não foi possivel encontrar o curso', 404);
        }

        return collegeCourse.college_subjects;
    }
}

module.exports = new CollegeCourseRepository();
