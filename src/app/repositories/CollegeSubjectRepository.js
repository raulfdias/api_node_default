'use strict';

const { CollegeSubject } = require('../models');

const APIException = require('../exceptions/APIException');

class CollegeSubjectRepository {
    async findById(id, include = []) {
        return await CollegeSubject.findByPk((parseInt(id)), { include });
    }

    async findFirst({ attributes = [], where = {}, order = [], include = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await CollegeSubject.findOne(options);
    }

    async listAll({ attributes = [], where = {}, order = [], include = [] }) {
        const options = {};
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
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

    async alreadyAssociationTeacherCollegeSubject(teacherId, subjectId) {
        const condition = {
            where: {
                cos_id_college_subject: subjectId
            },
            include: [{
                association: 'teachers',
                where: { tea_id_teacher: teacherId }
            }]
        };

        return await this.listAll(condition);
    }

    async getAllTeachersFromCollegeSubjects(id) {
        const collegeSubject = await this.findById(id, ['teachers']);

        return collegeSubject.teachers;
    }
}

module.exports = new CollegeSubjectRepository();
