'use strict';

const { CollegeCourse } = require('../models');
const APIException = require('../exceptions/APIException');

class CollegeCourseRepository {
    async findById(id) {
        return await CollegeCourse.findByPk((parseInt(id)));
    }

    async listAll({ attributes = [], where = {}, order = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (order.length > 0) options.order = order;

        return await CollegeCourse.findAll(options);
    }

    async store(data) {
        return await CollegeCourse.create(data);
    }

    async update(id, data) {
        const collegeCourse = await this.findById((parseInt(id)));

        if (!collegeCourse) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        return await collegeCourse.update(data);
    }

    async delete(id) {
        const collegeCourse = await this.findById(id);

        if (!collegeCourse) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        return await collegeCourse.destroy();
    }
}

module.exports = new CollegeCourseRepository();
