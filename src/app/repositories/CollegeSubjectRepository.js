'use strict';

const { CollegeSubject } = require('../models');

const APIException = require('../exceptions/APIException');

class CollegeSubjectRepository {
    async findById(id, { include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (include.length > 0) options.include = include;

        return await CollegeSubject.findByPk((parseInt(id)), options);
    }

    async findFirst({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await CollegeSubject.findOne(options);
    }

    async listAll({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await CollegeSubject.findAll(options);
    }

    async store(data, transaction = {}) {
        return await CollegeSubject.create(data, { transaction });
    }

    async update(id, data, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const collegeSubject = await this.findById((parseInt(id)));
        if (!collegeSubject) {
            throw new APIException('Não foi possivel encontrar a matéria', 404);
        }

        return await collegeSubject.update(data, options);
    }

    async delete(id, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        const collegeSubject = await this.findById(id, options);
        if (!collegeSubject) {
            throw new APIException('Não foi possivel encontrar a matéria', 404);
        }

        return await collegeSubject.destroy({ transaction });
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

    async getAllTeachersFromCollegeSubjects(id, { include = ['teachers'], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (include.length > 0) options.include = include;

        const collegeSubject = await this.findById(id, options);

        return collegeSubject.teachers;
    }
}

module.exports = new CollegeSubjectRepository();
