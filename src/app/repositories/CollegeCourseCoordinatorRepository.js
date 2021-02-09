'use strict';

const { CollegeCourseCoordinator } = require('../models');
const APIException = require('../exceptions/APIException');

class CollegeCourseCoordinatorRepository {
    async findById(id) {
        return await CollegeCourseCoordinator.findByPk((parseInt(id)));
    }

    async listAll({ attributes = [], where = {}, order = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (order.length > 0) options.order = order;

        return await CollegeCourseCoordinator.findAll(options);
    }

    async store(data) {
        return await CollegeCourseCoordinator.create(data);
    }

    async update(id, data) {
        const collegeCourseCoordinator = await this.findById((parseInt(id)));

        if (!collegeCourseCoordinator) {
            throw new APIException('Não foi possivel encontrar o coordenador do curso', 404);
        }

        return await collegeCourseCoordinator.update(data);
    }

    async delete(id) {
        const collegeCourseCoordinator = await this.findById(id);

        if (!collegeCourseCoordinator) {
            throw new APIException('Não foi possivel encontrar o coordenador do curso', 404);
        }

        return await collegeCourseCoordinator.destroy();
    }
}

module.exports = new CollegeCourseCoordinatorRepository();
