'use strict';

const CollegeCourseCoordinatorRepository = require('./CollegeCourseCoordinatorRepository');
const APIException = require('../exceptions/APIException');
const { CollegeCourse } = require('../models');

class CollegeCourseRepository {
    async findById(id, include = []) {
        return await CollegeCourse.findByPk((parseInt(id)), { include });
    }

    async listAll({ attributes = [], where = {}, order = [], include = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await CollegeCourse.findAll(options);
    }

    async store(data) {
        const collegeCourseCoordinator = await CollegeCourseCoordinatorRepository.findById(data.coc_fk_college_course_coordinator);

        if (collegeCourseCoordinator === null) {
            throw new APIException('Coordenador não existe', 400);
        }

        return await CollegeCourse.create(data);
    }

    async update(id, data) {
        const collegeCourse = await this.findById((parseInt(id)));

        if (!collegeCourse) {
            throw new APIException('Não foi possivel encontrar o professor', 404);
        }

        const collegeCourseCoordinator = await CollegeCourseCoordinatorRepository.findById(data.coc_fk_college_course_coordinator);

        if (collegeCourseCoordinator === null) {
            throw new APIException('Coordenador não existe', 400);
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
