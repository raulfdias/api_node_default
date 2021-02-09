'use strict';

const APIException = require('../../exceptions/APIException');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const CollegeSubjectRepository = require('../../repositories/CollegeSubjectRepository');
const CollegeSubjectEnum = require('../../enums/CollegeSubjectEnum');

class CollegeSubjectAPIController {
    /**
     * Função responsável por efetuar a listagem das máterias
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async list(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let collegeSubjects = [];
        let message = null;

        try {
            collegeSubjects = await CollegeSubjectRepository.listAll({});
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeSubjects = [];
        }

        return res.status(httpStatus).json({ collegeSubjects, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a busca das máterias
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async search(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let collegeSubjects = [];
        let message = null;

        try {
            const { body } = req;
            const where = {};

            if (body.status !== undefined) where.cos_en_status = CollegeSubjectEnum.normalizeStatus(body.status);
            if (body.email !== undefined) where.cos_ds_email = { [Op.like]: `%${body.email}%` };
            if (body.name !== undefined) where.cos_ds_name = { [Op.like]: `%${body.name}%` };

            collegeSubjects = await CollegeSubjectRepository.listAll({ where });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeSubjects = [];
        }

        return res.status(httpStatus).json({ collegeSubjects, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar o cadastro da máteria
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async store(req, res) {
        const { errors } = validationResult(req);
        let httpStatus = 200;
        const bagError = {};
        let collegeSubject = null;
        let message = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });

                throw new APIException('Verifique os campos obrigatórios', 400);
            } else {
                const data = {
                    'cos_en_status': CollegeSubjectEnum.normalizeStatus(req.body.status),
                    'cos_ds_email': req.body.email,
                    'cos_ds_name': req.body.name
                };
                collegeSubject = await CollegeSubjectRepository.store(data);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeSubject = null;
        }

        return res.status(httpStatus).json({ collegeSubject, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a exibição da máteria
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async show(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let collegeSubject = null;
        let message = null;

        try {
            const { id } = req.params;
            collegeSubject = await CollegeSubjectRepository.findById(id);

            if (collegeSubject === null) {
                throw new APIException('Não encontrado', 404);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeSubject = null;
        }

        return res.status(httpStatus).json({ collegeSubject, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a atualização da máteria
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async update(req, res) {
        const { errors } = validationResult(req);
        let httpStatus = 200;
        const bagError = {};
        let collegeSubject = null;
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

                if (data.status !== undefined) teacherData.cos_en_status = CollegeSubjectEnum.normalizeStatus(data.status);
                if (data.email !== undefined) teacherData.cos_ds_email = data.email;
                if (data.name !== undefined) teacherData.cos_ds_name = data.name;

                collegeSubject = await CollegeSubjectRepository.update(id, teacherData);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeSubject = null;
        }

        return res.status(httpStatus).json({ collegeSubject, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a remoção da máteria
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
            deleted = await CollegeSubjectRepository.delete(id);
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

module.exports = new CollegeSubjectAPIController();
