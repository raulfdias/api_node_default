'use strict';

const { CollegeSubject } = require('../models');
const APIException = require('../exceptions/APIException');

class CollegeSubjectRepository {
    async findById(id) {
        return await CollegeSubject.findByPk((parseInt(id)));
    }

    async listAll({ attributes = [], where = {}, order = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (order.length > 0) options.order = order;

        return await CollegeSubject.findAll(options);
    }

    async store(data) {
        return await CollegeSubject.create(data);
    }

    async update(id, data) {
        const collegeSubject = await this.findById((parseInt(id)));

        if (!collegeSubject) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        return await collegeSubject.update(data);
    }

    async delete(id) {
        const collegeSubject = await this.findById(id);

        if (!collegeSubject) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        return await collegeSubject.destroy();
    }
}

module.exports = new CollegeSubjectRepository();
