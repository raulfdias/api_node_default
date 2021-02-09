'use strict';

const APIException = require('../../exceptions/APIException');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const CollegeCourseRepository = require('../../repositories/CollegeCourseRepository');
const CollegeCourseCoordinatorRepository = require('../../repositories/CollegeCourseCoordinatorRepository');
const CollegeCourseEnum = require('../../enums/CollegeCourseEnum');

class CollegeCourseAPIController {
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
        let collegeCourses = [];
        let message = null;

        try {
            collegeCourses = await CollegeCourseRepository.listAll({});
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourses = [];
        }

        return res.status(httpStatus).json({ collegeCourses, httpStatus, message, bagError });
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
        let collegeCourses = [];
        let message = null;

        try {
            const { body } = req;
            const where = {};

            if (body.status !== undefined) where.coc_en_status = CollegeCourseEnum.normalizeStatus(body.status);
            if (body.email !== undefined) where.coc_ds_email = { [Op.like]: `%${body.email}%` };
            if (body.name !== undefined) where.coc_ds_name = { [Op.like]: `%${body.name}%` };

            collegeCourses = await CollegeCourseRepository.listAll({ where });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourses = [];
        }

        return res.status(httpStatus).json({ collegeCourses, httpStatus, message, bagError });
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
        let collegeCourse = null;
        let message = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const collegeCourseCoordinator = await CollegeCourseCoordinatorRepository.findById(req.body.college_course_coordinator);
                if (collegeCourseCoordinator === null) {
                    throw new APIException('Coordenador não existe', 400);
                }

                const data = {
                    'coc_fk_college_course_coordinator': req.body.college_course_coordinator,
                    'coc_en_status': CollegeCourseEnum.normalizeStatus(req.body.status),
                    'coc_ds_email': req.body.email,
                    'coc_ds_name': req.body.name
                };
                collegeCourse = await CollegeCourseRepository.store(data);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourse = null;
        }

        return res.status(httpStatus).json({ collegeCourse, httpStatus, message, bagError });
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
        let collegeCourse = null;
        let message = null;

        try {
            const { id } = req.params;
            collegeCourse = await CollegeCourseRepository.findById(id);

            if (collegeCourse === null) {
                throw new APIException('Não encontrado', 404);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourse = null;
        }

        return res.status(httpStatus).json({ collegeCourse, httpStatus, message, bagError });
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
        let collegeCourse = null;
        let message = null;

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

                if (data.status !== undefined) teacherData.coc_en_status = CollegeCourseEnum.normalizeStatus(data.status);
                if (data.email !== undefined) teacherData.coc_ds_email = data.email;
                if (data.name !== undefined) teacherData.coc_ds_name = data.name;

                collegeCourse = await CollegeCourseRepository.update(id, teacherData);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourse = null;
        }

        return res.status(httpStatus).json({ collegeCourse, httpStatus, message, bagError });
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
        let deleted = false;
        let message = null;

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

        return res.status(httpStatus).json({ deleted, httpStatus, message, bagError });
    }
}

module.exports = new CollegeCourseAPIController();
