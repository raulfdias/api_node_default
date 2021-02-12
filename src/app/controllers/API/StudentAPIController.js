'use strict';

const APIException = require('../../exceptions/APIException'),
    { validationResult } = require('express-validator'),
    { Op } = require('sequelize'),
    { sequelize } = require('../../models');

const Controller = require('../Controller');

const StudentRepository = require('../../repositories/StudentRepository'),
    CollegeCourseRepository = require('../../repositories/CollegeCourseRepository');

const StudentEnum = require('../../enums/StudentEnum'),
    StudentCollegeCourseEnum = require('../../enums/StudentCollegeCourseEnum');

class StudentAPIController extends Controller {
    /**
     * Função responsável por efetuar a listagem dos estudantes
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async list(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let students = [];

        try {
            students = await StudentRepository.listAll({});
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            students = [];
        }

        return res.status(httpStatus).json({ students, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a busca de coordenadores
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async search(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let students = [];

        try {
            const { body } = req;
            const where = {};

            if (body.college_semester !== undefined) where.stu_en_college_semester = StudentEnum.normalizeCollegeSemester(body.college_semester);
            if (body.status !== undefined) where.stu_en_status = StudentEnum.normalizeStatus(body.status);
            if (body.email !== undefined) where.stu_ds_email = { [Op.like]: `%${body.email}%` };
            if (body.name !== undefined) where.stu_ds_name = { [Op.like]: `%${body.name}%` };

            students = await StudentRepository.listAll({ where });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            students = [];
        }

        return res.status(httpStatus).json({ students, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar o cadastro do estudante
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

        let student = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const data = {
                    'stu_en_college_semester': StudentEnum.normalizeCollegeSemester(req.body.college_semester),
                    'stu_en_status': StudentEnum.normalizeStatus(req.body.status),
                    'stu_ds_email': req.body.email,
                    'stu_ds_name': req.body.name
                };
                student = await StudentRepository.store(data);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            student = null;
        }

        return res.status(httpStatus).json({ student, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a exibição do estudante
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async show(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let student = null;

        try {
            const { id } = req.params;
            student = await StudentRepository.findById(id);

            if (student === null) {
                throw new APIException('Não encontrado', 404);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            student = null;
        }

        return res.status(httpStatus).json({ student, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a atualização do estudante
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

        let student = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const { data } = req.body;
                const { id } = req.params;
                const studentData = {};

                if (data.college_semester !== undefined) studentData.stu_en_college_semester = StudentEnum.normalizeCollegeSemester(data.college_semester);
                if (data.status !== undefined) studentData.stu_en_status = StudentEnum.normalizeStatus(data.status);
                if (data.email !== undefined) studentData.stu_ds_email = data.email;
                if (data.name !== undefined) studentData.stu_ds_name = data.name;

                student = await StudentRepository.update(id, studentData);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            student = null;
        }

        return res.status(httpStatus).json({ student, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a remoção do estudante
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
            deleted = await StudentRepository.delete(id);
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
     * Função responsável por efetuar a associação das matérias ao aluno
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async associateCollegeCurses(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        const t = await sequelize.transaction();

        let student = null;

        try {
            const { id } = req.params;
            const courses = req.body;

            student = await StudentRepository.findById(id);
            if (student === null) {
                throw new APIException('Aluno não encontrado', 404);
            }

            for (let index = 0; index < courses.length; index++) {
                let { course, period } = courses[index];

                period = StudentCollegeCourseEnum.normalizePeriod(period);

                const collegeCourse = await CollegeCourseRepository.findById(course);
                if (collegeCourse === null) {
                    throw new APIException('Não foi possivel efetuar a associação, verifique os cursos informados.', 400);
                }

                const studentCollegeCourses = await StudentRepository.getAllCollegeCourseFromStudent(student.stu_id_student, { transaction: t });
                if (studentCollegeCourses.length > 0) {
                    const checkMatriculationEnrollmentPeriod = (this.checkMatriculationEnrollmentPeriod(studentCollegeCourses, period, collegeCourse.coc_id_college_course));
                    if ((checkMatriculationEnrollmentPeriod.enrollmentPeriod !== undefined) && (checkMatriculationEnrollmentPeriod.enrollmentCourse === undefined)) {
                        period = StudentCollegeCourseEnum.normalizePeriod(period, 'txt');
                        throw new APIException(`O aluno ja se encontra matriculado em um curso no periodo: ${period}`, 400);
                    } else if (checkMatriculationEnrollmentPeriod.enrollmentCourse !== undefined) {
                        continue;
                    }
                }

                await student.addCollege_courses(collegeCourse, { through: { scc_en_course_period: period }, transaction: t });

                course = period = null;
            }

            await t.commit();

            student = await StudentRepository.findById(id, { include: ['college_courses'] });
        } catch (err) {
            console.error(err);
            await t.rollback();
            httpStatus = err.status ?? 500;
            message = err.message;

            student = null;
        }

        return res.status(httpStatus).json({ student, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a desassociação das matérias ao aluno
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async disassociateCollegeCurses(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        const t = await sequelize.transaction();

        let student = null;

        try {
            const { id } = req.params;
            const { courses } = req.body;

            student = await StudentRepository.findById(id);
            if (student === null) {
                throw new APIException('Aluno não encontrado', 404);
            }

            for (let index = 0; index < courses.length; index++) {
                const collegeCourse = await CollegeCourseRepository.findById(courses[index]);
                if (collegeCourse === null) {
                    throw new APIException('Não foi possivel efetuar a desassociação, verifique os cursos informados.', 400);
                }

                await student.removeCollege_courses(collegeCourse, { transaction: t });
            }

            await t.commit();

            student = await StudentRepository.findById(id, { include: ['college_courses'] });
        } catch (err) {
            console.error(err);
            await t.rollback();
            httpStatus = err.status ?? 500;
            message = err.message;

            student = null;
        }

        return res.status(httpStatus).json({ student, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a busca os cursos do aluno
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async getAllCollegeCourse(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let collegeCourses = [];

        try {
            const { id } = req.params;

            const student = await StudentRepository.findById(id);
            if (student === null) {
                throw new APIException('Estudante não encontrado', 404);
            }

            collegeCourses = await StudentRepository.getAllCollegeCourseFromStudent(student.stu_id_student, { include: ['college_courses'] });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourses = [];
        }

        return res.status(httpStatus).json({ collegeCourses, httpStatus, message, bagError });
    }

    /**
     * Função responsável por validar se o aluno ja está matriculado no curso ou turno informado
     *
     * @param {*} studentCollegeCourses
     * @param {*} checkEnrollmentPeriod
     * @param {*} checkCollegeCourse
     * @returns JSON
     */
    checkMatriculationEnrollmentPeriod(studentCollegeCourses, checkEnrollmentPeriod, checkCollegeCourse) {
        const enrollmentPeriod = studentCollegeCourses.find((value) => value.StudentCollegeCourse.scc_en_course_period === checkEnrollmentPeriod);
        const enrollmentCourse = studentCollegeCourses.find((value) => value.StudentCollegeCourse.scc_fk_college_course === checkCollegeCourse);

        return { enrollmentPeriod, enrollmentCourse };
    }
}

module.exports = new StudentAPIController();
