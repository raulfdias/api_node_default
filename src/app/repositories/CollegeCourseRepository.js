'use strict';

const { CollegeCourse, StudentCollegeCourse } = require('../models');

const APIException = require('../exceptions/APIException');

class CollegeCourseRepository {
    async findById(id, include = []) {
        return await CollegeCourse.findByPk((parseInt(id)), { include });
    }

    async findFirst({ attributes = [], where = {}, order = [], include = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await CollegeCourse.findOne(options);
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

    async alreadyAssociationStudentCollegeCourse(sutudentId, courseId, period) {
        const condition = {
            where: {
                coc_id_college_course: courseId
            },
            include: [{
                association: 'students',
                where: { stu_id_student: sutudentId },
                through: {
                    model: StudentCollegeCourse,
                    where: { scc_en_course_period: period }
                }
            }]
        };

        return await this.listAll(condition);
    }
}

module.exports = new CollegeCourseRepository();
