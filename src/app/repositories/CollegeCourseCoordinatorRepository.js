'use strict';

const { CollegeCourseCoordinator } = require('../models');

const APIException = require('../exceptions/APIException');

class CollegeCourseCoordinatorRepository {
    async findById(id, { include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (include.length > 0) options.include = include;

        return await CollegeCourseCoordinator.findByPk((parseInt(id)), options);
    }

    async findFirst({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await CollegeCourseCoordinator.findOne(options);
    }

    async listAll({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await CollegeCourseCoordinator.findAll(options);
    }

    async store(data, transaction = {}) {
        return await CollegeCourseCoordinator.create(data, { transaction });
    }

    async update(id, data, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const collegeCourseCoordinator = await this.findById((parseInt(id)));
        if (!collegeCourseCoordinator) {
            throw new APIException('Não foi possivel encontrar o coordenador', 404);
        }

        return await collegeCourseCoordinator.update(data, options);
    }

    async delete(id, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const collegeCourseCoordinator = await this.findById(id, options);
        if (!collegeCourseCoordinator) {
            throw new APIException('Não foi possivel encontrar o coordenador', 404);
        }

        return await collegeCourseCoordinator.destroy({ transaction });
    }
}

module.exports = new CollegeCourseCoordinatorRepository();
