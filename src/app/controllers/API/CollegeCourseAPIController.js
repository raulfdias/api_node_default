'use strict';

const { validationResult } = require('express-validator'),
    { Op } = require('sequelize'),
    { sequelize } = require('../../models');

const APIException = require('../../exceptions/APIException');

const Controller = require('../Controller');

const CollegeCourseRepository = require('../../repositories/CollegeCourseRepository'),
    CollegeCourseCoordinatorRepository = require('../../repositories/CollegeCourseCoordinatorRepository'),
    CollegeSubjectRepository = require('../../repositories/CollegeSubjectRepository');

const CollegeCourseEnum = require('../../enums/CollegeCourseEnum');

class CollegeCourseAPIController extends Controller {
    /**
     * Função responsável por efetuar a listagem dos cursos
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async list(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let collegeCourses = [];

        try {
            collegeCourses = await CollegeCourseRepository.listAll({ include: ['college_course_coordinator'] });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourses = [];
        }

        return res.status(httpStatus).json({ collegeCourses, message, bagError });
    }

    /**
     * Função responsável por efetuar a busca dos cursos
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async search(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let collegeCourses = [];

        try {
            const { body } = req;
            const where = {};

            if (body.status !== undefined) where.coc_en_status = CollegeCourseEnum.normalizeStatus(body.status);
            if (body.name !== undefined) where.coc_ds_name = { [Op.like]: `%${body.name}%` };

            collegeCourses = await CollegeCourseRepository.listAll({ where, include: ['college_course_coordinator'] });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourses = [];
        }

        return res.status(httpStatus).json({ collegeCourses, message, bagError });
    }

    /**
     * Função responsável por efetuar o cadastro do curso
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

        let collegeCourse = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const { body } = req;

                let idCollegeCourseCoordinator = null;
                if (body.college_course_coordinator) {
                    const collegeCourseCoordinator = await CollegeCourseCoordinatorRepository.findById(body.college_course_coordinator, { include: ['college_course'] });
                    if (collegeCourseCoordinator === null) {
                        throw new APIException('Coordenador não existe', 400);
                    }

                    if (collegeCourseCoordinator.college_course) {
                        throw new APIException('Coordenador já está administrando outros cursos', 400);
                    }

                    idCollegeCourseCoordinator = collegeCourseCoordinator.ccc_id_college_course_coordinator;
                }

                const data = {
                    coc_fk_college_course_coordinator: idCollegeCourseCoordinator,
                    coc_en_status: CollegeCourseEnum.normalizeStatus(body.status),
                    coc_ds_name: body.name
                };
                collegeCourse = await CollegeCourseRepository.store(data).then((collegeCourse) => {
                    return CollegeCourseRepository.findById(collegeCourse.coc_id_college_course, { include: ['college_course_coordinator'] });
                });
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourse = null;
        }

        return res.status(httpStatus).json({ collegeCourse, message, bagError });
    }

    /**
     * Função responsável por efetuar a exibição do curso
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async show(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let collegeCourse = null;

        try {
            const { id } = req.params;
            collegeCourse = await CollegeCourseRepository.findById(id, ['college_course_coordinator']);

            if (collegeCourse === null) {
                throw new APIException('Curso não encontrado', 404);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourse = null;
        }

        return res.status(httpStatus).json({ collegeCourse, message, bagError });
    }

    /**
     * Função responsável por efetuar a atualização do curso
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

        let collegeCourse = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const { data } = req.body;
                const { id } = req.params;
                const collegeCourseData = {};

                if (data.college_course_coordinator) {
                    const collegeCourseCoordinator = await CollegeCourseCoordinatorRepository.findById(data.college_course_coordinator, { include: ['college_course'] });
                    if (collegeCourseCoordinator === null) {
                        throw new APIException('Coordenador não existe', 400);
                    }

                    const { college_course: coordinatorCollegeCourse } = collegeCourseCoordinator;
                    if ((collegeCourseCoordinator.college_course) && (coordinatorCollegeCourse.coc_fk_college_course_coordinator !== id)) {
                        throw new APIException('Coordenador já está administrando outros cursos', 400);
                    }
                }

                if (data.college_course_coordinator !== undefined) collegeCourseData.coc_fk_college_course_coordinator = data.college_course_coordinator;
                if (data.status !== undefined) collegeCourseData.coc_en_status = CollegeCourseEnum.normalizeStatus(data.status);
                if (data.name !== undefined) collegeCourseData.coc_ds_name = data.name;

                collegeCourse = await CollegeCourseRepository.update(id, collegeCourseData).then((collegeCourse) => {
                    return CollegeCourseRepository.findById(collegeCourse.coc_id_college_course, { include: ['college_course_coordinator'] });
                });
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourse = null;
        }

        return res.status(httpStatus).json({ collegeCourse, message, bagError });
    }

    /**
     * Função responsável por efetuar a remoção do curso
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
            deleted = await CollegeCourseRepository.delete(id);
            deleted = true;
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            deleted = false;
        }

        return res.status(httpStatus).json({ deleted, message, bagError });
    }

    /**
     * Função responsável por efetuar a associação das matérias ao curso
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

        let collegeCourse = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const { id } = req.params;
                const { subjects } = req.body;

                collegeCourse = await CollegeCourseRepository.findById(id);
                if (collegeCourse === null) {
                    throw new APIException('Curso não encontrado', 404);
                }

                for (let index = 0; index < subjects.length; index++) {
                    const subject = await CollegeSubjectRepository.findById(subjects[index]);
                    if (subject === null) {
                        throw new APIException('Não foi possivel efetuar a associação, verifique as matérias informadas.', 400);
                    }

                    const condition = {
                        where: {
                            coc_id_college_course: collegeCourse.coc_id_college_course
                        },
                        include: [{
                            association: 'college_subjects',
                            where: { cos_id_college_subject: subject.cos_id_college_subject }
                        }],
                        transaction: t
                    };
                    const courseSubject = await CollegeCourseRepository.listAll(condition);
                    if (courseSubject.length > 0) {
                        continue;
                    }

                    await collegeCourse.addCollege_subjects(subject, { transaction: t });
                }

                await t.commit();

                collegeCourse = await CollegeCourseRepository.findById(id, { include: ['college_subjects'] });
            }
        } catch (err) {
            console.error(err);
            await t.rollback();
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourse = null;
        }

        return res.status(httpStatus).json({ collegeCourse, message, bagError });
    }

    /**
     * Função responsável por efetuar a desassociação das matérias ao curso
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

        let collegeCourse = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const { id } = req.params;
                const { subjects } = req.body;

                collegeCourse = await CollegeCourseRepository.findById(id);
                if (collegeCourse === null) {
                    throw new APIException('Curso não encontrado', 404);
                }

                for (let index = 0; index < subjects.length; index++) {
                    const subject = await CollegeSubjectRepository.findById(subjects[index]);
                    if (subject === null) {
                        throw new APIException('Não foi possivel efetuar a desassociação, verifique as matérias informadas.', 400);
                    }

                    await collegeCourse.removeCollege_subjects(subject, { transaction: t });
                }

                await t.commit();

                collegeCourse = await CollegeCourseRepository.findById(id, { include: ['college_subjects'] });
            }
        } catch (err) {
            console.error(err);
            await t.rollback();
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourse = null;
        }

        return res.status(httpStatus).json({ collegeCourse, message, bagError });
    }

    /**
     * Função responsável por efetuar a busca das matérias do curso
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

            const collegeCourse = await CollegeCourseRepository.findById(id);
            if (collegeCourse === null) {
                throw new APIException('Curso não encontrado', 404);
            }

            collegeSubjects = await CollegeCourseRepository.getAllCollegeSubjectsFromCourse(collegeCourse.coc_id_college_course);
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeSubjects = [];
        }

        return res.status(httpStatus).json({ collegeSubjects, message, bagError });
    }

    /**
     * Função responsável por efetuar a busca dos alunos do curso
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async getAllStudents(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let students = [];

        try {
            const { id } = req.params;

            const collegeCourse = await CollegeCourseRepository.findById(id);
            if (collegeCourse === null) {
                throw new APIException('Curso não encontrado', 404);
            }

            students = await CollegeCourseRepository.getAllStudentsFromCourse(collegeCourse.coc_id_college_course);
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            students = [];
        }

        return res.status(httpStatus).json({ students, message, bagError });
    }

    /**
     * Função responsável por efetuar a busca do coordenador do curso
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async getCollegeCourseCoordinator(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let collegeCourseCoordinator = null;

        try {
            const { id } = req.params;

            const collegeCourse = await CollegeCourseRepository.findById(id);
            if (collegeCourse === null) {
                throw new APIException('Curso não encontrado', 404);
            }

            collegeCourseCoordinator = await CollegeCourseCoordinatorRepository.findById(collegeCourse.coc_fk_college_course_coordinator, { include: ['college_course'] });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourseCoordinator = null;
        }

        return res.status(httpStatus).json({ collegeCourseCoordinator, message, bagError });
    }
}

module.exports = new CollegeCourseAPIController();
