'use strict';

const StudentRepository = require('../../repositories/StudentRepository');
const { validationResult } = require('express-validator');
const StudentEnum = require('../../enums/StudentEnum');
const { Op } = require('sequelize');

class StudentAPIController {
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
        let students = [];
        let message = null;

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
        let student = null;
        let message = null;

        try {
            if (errors.length > 0) {
                errors.forEach((value, index, array) => {
                    bagError[value.param] = value.msg;
                });
                httpStatus = 400;
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
        let student = null;
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
        let deleted = false;
        let message = null;

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
     * Função responsável por efetuar a busca de coordenadores
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async search(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let students = [];
        let message = null;

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
     * Função responsável por efetuar a exibição do estudante
     *
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    async show(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let student = null;
        let message = null;

        try {
            const { id } = req.params;
            student = await StudentRepository.findById(id);

            if (student === null) {
                httpStatus = 404;
            }
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            student = null;
        }

        return res.status(httpStatus).json({ student, httpStatus, message, bagError });
    }
}

module.exports = new StudentAPIController();
