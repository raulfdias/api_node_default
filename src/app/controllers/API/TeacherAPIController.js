'use strict';

const APIException = require('../../exceptions/APIException');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const TeacherRepository = require('../../repositories/TeacherRepository');
const TeacherEnum = require('../../enums/TeacherEnum');

class TeacherAPIController {
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
        let teachers = [];
        let message = null;

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
        let teachers = [];
        let message = null;

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
        let teacher = null;
        let message = null;

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
        let teacher = null;
        let message = null;

        try {
            const { id } = req.params;
            teacher = await TeacherRepository.findById(id);

            if (teacher === null) {
                httpStatus = 404;
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
        let teacher = null;
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
        let deleted = false;
        let message = null;

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
}

module.exports = new TeacherAPIController();
