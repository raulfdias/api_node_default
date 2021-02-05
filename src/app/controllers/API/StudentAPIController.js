'use strict';

const StudentRepository = require('../repositories/StudentRepository');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

class StudentAPIController {
    async list(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let students = null;
        let message = null;

        try {
            students = await StudentRepository.listAll({});
        } catch (err) {
            console.error(err);
            message = err.message;
            httpStatus = 500;
            students = {};
        }

        return res.status(httpStatus).json({ students, httpStatus, message, bagError });
    }

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
                    'stu_ds_college_semester': req.body.college_semester,
                    'stu_ds_status': req.body.status,
                    'stu_ds_email': req.body.email,
                    'stu_ds_name': req.body.name
                };
                student = await StudentRepository.store(data);
            }
        } catch (err) {
            console.error(err);
            message = err.message;
            httpStatus = 500;
            student = null;
        }

        return res.status(httpStatus).json({ student, httpStatus, message, bagError });
    }

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

                if (data.college_semester !== undefined) studentData.stu_ds_college_semester = data.college_semester;
                if (data.status !== undefined) studentData.stu_ds_status = data.status;
                if (data.email !== undefined) studentData.stu_ds_email = data.email;
                if (data.name !== undefined) studentData.stu_ds_name = data.name;

                student = await StudentRepository.update(id, studentData);
            }
        } catch (err) {
            console.error(err);
            message = err.message;
            httpStatus = 500;
            student = null;
        }

        return res.status(httpStatus).json({ student, httpStatus, message, bagError });
    }

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
            message = err.message;
            httpStatus = 500;
            deleted = false;
        }

        return res.status(httpStatus).json({ deleted, httpStatus, message, bagError });
    }

    async search(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let students = null;
        let message = null;

        try {
            const { body } = req;
            const where = {};

            if (body.college_semester !== undefined) where.stu_ds_college_semester = body.college_semester;
            if (body.email !== undefined) where.stu_ds_email = { [Op.like]: `%${body.email}%` };
            if (body.name !== undefined) where.stu_ds_name = { [Op.like]: `%${body.name}%` };
            if (body.status !== undefined) where.stu_ds_status = body.status;

            students = await StudentRepository.listAll({ where });
        } catch (err) {
            console.error(err);
            message = err.message;
            httpStatus = 500;
            students = {};
        }

        return res.status(httpStatus).json({ students, httpStatus, message, bagError });
    }

    async show(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let student = null;
        let message = null;

        try {
            const { id } = req.params;
            student = await StudentRepository.findById(id);
        } catch (err) {
            console.error(err);
            message = err.message;
            httpStatus = 500;
            student = null;
        }

        return res.status(httpStatus).json({ student, httpStatus, message, bagError });
    }
}

module.exports = new StudentAPIController();
