'use strict';

const { Teacher } = require('../models');
const APIException = require('../exceptions/APIException');

class TeacherRepository {
    async findById(id) {
        return await Teacher.findByPk((parseInt(id)));
    }

    async listAll({ attributes = [], where = {}, order = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (order.length > 0) options.order = order;

        return await Teacher.findAll(options);
    }

    async store(data) {
        return await Teacher.create(data);
    }

    async update(id, data) {
        const teacher = await this.findById((parseInt(id)));

        if (!teacher) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        return await teacher.update(data);
    }

    async delete(id) {
        const teacher = await this.findById(id);

        if (!teacher) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        return await teacher.destroy();
    }
}

module.exports = new TeacherRepository();
