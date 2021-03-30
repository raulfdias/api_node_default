'use strict';

const { validationResult } = require('express-validator'),
    { Op } = require('sequelize'),
    { sequelize } = require('../../models');

const APIException = require('../../exceptions/APIException');

const Controller = require('../Controller');

const TeacherRepository = require('../../repositories/TeacherRepository'),
    CollegeSubjectRepository = require('../../repositories/CollegeSubjectRepository');

const TeacherEnum = require('../../enums/TeacherEnum');

class TeacherAPIController extends Controller {
    /**
     * Função responsável por efetuar a listagem dos professores
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async list(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let teachers = [];

        try {
            teachers = await TeacherRepository.listAll({});
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            teachers = [];
        }

        return res.status(httpStatus).json({ teachers, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a listagem dos coordenadores
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async search(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let teachers = [];

        try {
            const { body } = req;
            const where = {};

            if (body.status !== undefined) where.tea_en_status = TeacherEnum.normalizeStatus(body.status);
            if (body.email !== undefined) where.tea_ds_email = { [Op.like]: `%${body.email}%` };
            if (body.name !== undefined) where.tea_ds_name = { [Op.like]: `%${body.name}%` };

            teachers = await TeacherRepository.listAll({ where });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            teachers = [];
        }

        return res.status(httpStatus).json({ teachers, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar o cadastro do professor
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async store(req, res) {
        const { errors } = validationResult(req);
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let teacher = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const data = {
                    'tea_en_status': TeacherEnum.normalizeStatus(req.body.status),
                    'tea_ds_email': req.body.email,
                    'tea_ds_name': req.body.name
                };
                teacher = await TeacherRepository.store(data);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            teacher = null;
        }

        return res.status(httpStatus).json({ teacher, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a exibição do professor
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async show(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let teacher = null;

        try {
            const { id } = req.params;
            teacher = await TeacherRepository.findById(id);

            if (teacher === null) {
                throw new APIException('Não encontrado', 404);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            teacher = null;
        }

        return res.status(httpStatus).json({ teacher, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a atualização do professor
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async update(req, res) {
        const { errors } = validationResult(req);
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let teacher = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const { data } = req.body;
                const { id } = req.params;
                const teacherData = {};

                if (data.status !== undefined) teacherData.tea_en_status = TeacherEnum.normalizeStatus(data.status);
                if (data.email !== undefined) teacherData.tea_ds_email = data.email;
                if (data.name !== undefined) teacherData.tea_ds_name = data.name;

                teacher = await TeacherRepository.update(id, teacherData);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            teacher = null;
        }

        return res.status(httpStatus).json({ teacher, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a remoção do professor
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async delete(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let deleted = false;

        try {
            const { id } = req.params;
            deleted = await TeacherRepository.delete(id);
            deleted = true;
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            deleted = false;
        }

        return res.status(httpStatus).json({ deleted, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a associação das matérias ao professor
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async associateCollegeSubject(req, res) {
        const { errors } = validationResult(req);
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        const t = await sequelize.transaction();

        let teacher = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const { id } = req.params;
                const { subjects } = req.body;

                teacher = await TeacherRepository.findById(id);
                if (teacher === null) {
                    throw new APIException('Professor não encontrado', 404);
                }

                for (let index = 0; index < subjects.length; index++) {
                    const subject = await CollegeSubjectRepository.findById(subjects[index]);
                    if (subject === null) {
                        throw new APIException('Não foi possivel efetuar a associação, verifique as matérias informadas.', 400);
                    }

                    const condition = {
                        where: {
                            tea_id_teacher: teacher.tea_id_teacher
                        },
                        include: [{
                            association: 'college_subjects',
                            where: { cos_id_college_subject: subject.cos_id_college_subject }
                        }],
                        transaction: t
                    };
                    const teacherSubject = await TeacherRepository.listAll(condition);
                    if (teacherSubject.length > 0) {
                        continue;
                    }

                    await teacher.addCollege_subjects(subject, { transaction: t });
                }

                await t.commit();

                teacher = await TeacherRepository.findById(id, { include: ['college_subjects'] });
            }
        } catch (err) {
            console.error(err);
            await t.rollback();
            httpStatus = err.status ?? 500;
            message = err.message;

            teacher = null;
        }

        return res.status(httpStatus).json({ teacher, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a desassociação das matéras ao professor
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async disassociateCollegeSubject(req, res) {
        const { errors } = validationResult(req);
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        const t = await sequelize.transaction();

        let teacher = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const { id } = req.params;
                const { subjects } = req.body;

                teacher = await TeacherRepository.findById(id);
                if (teacher === null) {
                    throw new APIException('Professor não encontrado', 404);
                }

                for (let index = 0; index < subjects.length; index++) {
                    const subject = await CollegeSubjectRepository.findById(subjects[index]);
                    if (subject === null) {
                        throw new APIException('Não foi possivel efetuar a desassociação, verifique as matérias informadas.', 400);
                    }

                    await teacher.removeCollege_subjects(subject, { transaction: t });
                }

                await t.commit();

                teacher = await TeacherRepository.findById(id, { include: ['college_subjects'] });
            }
        } catch (err) {
            console.error(err);
            await t.rollback();
            httpStatus = err.status ?? 500;
            message = err.message;

            teacher = null;
        }

        return res.status(httpStatus).json({ teacher, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a busca das matérias do professor
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async getAllCollegeSubject(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let collegeSubjects = [];

        try {
            const { id } = req.params;

            const teacher = await TeacherRepository.findById(id);
            if (teacher === null) {
                throw new APIException('Professor não encontrado', 404);
            }

            collegeSubjects = await TeacherRepository.getAllCollegeSubjectsFromTeacher(teacher.tea_id_teacher);
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeSubjects = [];
        }

        return res.status(httpStatus).json({ collegeSubjects, httpStatus, message, bagError });
    }
}

module.exports = new TeacherAPIController();
