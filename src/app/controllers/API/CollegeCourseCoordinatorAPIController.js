'use strict';

const CollegeCourseCoordinatorRepository = require('../../repositories/CollegeCourseCoordinatorRepository');
const { validationResult } = require('express-validator');
const CollegeCourseCoordinatorEnum = require('../../enums/CollegeCourseCoordinatorEnum');
const { Op } = require('sequelize');

class CollegeCourseCoordinatorAPIController {
    /**
     * Função responsável por efetuar a listagem dos coordenadores
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async list(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let collegeCourseCoordinators = [];
        let message = null;

        try {
            collegeCourseCoordinators = await CollegeCourseCoordinatorRepository.listAll({});
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourseCoordinators = [];
        }

        return res.status(httpStatus).json({ collegeCourseCoordinators, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar o cadastro de um coordenador
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async store(req, res) {
        const { errors } = validationResult(req);
        let httpStatus = 200;
        const bagError = {};
        let collegeCourseCoordinator = null;
        let message = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });
                httpStatus = 400;
            } else {
                const data = {
                    'ccc_ds_status': CollegeCourseCoordinatorEnum.normalizeStatus(req.body.status),
                    'ccc_ds_email': req.body.email,
                    'ccc_ds_name': req.body.name
                };
                collegeCourseCoordinator = await CollegeCourseCoordinatorRepository.store(data);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourseCoordinator = null;
        }

        return res.status(httpStatus).json({ collegeCourseCoordinator, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a atualização do coordenador
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async update(req, res) {
        const { errors } = validationResult(req);
        let httpStatus = 200;
        const bagError = {};
        let collegeCourseCoordinator = null;
        let message = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });
                httpStatus = 400;
            } else {
                const { data } = req.body;
                const { id } = req.params;
                const collegeCourseCoordinatorData = {};

                if (data.status !== undefined) collegeCourseCoordinatorData.ccc_ds_status = CollegeCourseCoordinatorEnum.normalizeStatus(data.status);
                if (data.email !== undefined) collegeCourseCoordinatorData.ccc_ds_email = data.email;
                if (data.name !== undefined) collegeCourseCoordinatorData.ccc_ds_name = data.name;

                collegeCourseCoordinator = await CollegeCourseCoordinatorRepository.update(id, collegeCourseCoordinatorData);
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourseCoordinator = null;
        }

        return res.status(httpStatus).json({ collegeCourseCoordinator, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a remoção do coordenador
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
            deleted = await CollegeCourseCoordinatorRepository.delete(id);
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
     * Função responsável por efetuar a busca de coordenadores
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async search(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let collegeCourseCoordinators = [];
        let message = null;

        try {
            const { body } = req;
            const where = {};

            if (body.status !== undefined) where.ccc_ds_status = CollegeCourseCoordinatorEnum.normalizeStatus(body.status);
            if (body.email !== undefined) where.ccc_ds_email = { [Op.like]: `%${body.email}%` };
            if (body.name !== undefined) where.ccc_ds_name = { [Op.like]: `%${body.name}%` };

            collegeCourseCoordinators = await CollegeCourseCoordinatorRepository.listAll({ where });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourseCoordinators = [];
        }

        return res.status(httpStatus).json({ collegeCourseCoordinators, httpStatus, message, bagError });
    }

    /**
     * Função responsável por efetuar a exibição do coordenador
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async show(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let collegeCourseCoordinator = null;
        let message = null;

        try {
            const { id } = req.params;
            collegeCourseCoordinator = await CollegeCourseCoordinatorRepository.findById(id);

            if (collegeCourseCoordinator === null) {
                httpStatus = 404;
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            collegeCourseCoordinator = null;
        }

        return res.status(httpStatus).json({ collegeCourseCoordinator, httpStatus, message, bagError });
    }
}

module.exports = new CollegeCourseCoordinatorAPIController();
