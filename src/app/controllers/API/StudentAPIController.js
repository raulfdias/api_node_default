const StudentRepository = require('../../repositories/StudentRepository');
const { validationResult } = require('express-validator');

class StudentAPIController {
    async list(req, res) {
        const students = await StudentRepository.findAll();

        return res.json(students);
    }

    async search(req, res) {
        console.log(req);
    }

    async show(req, res) {
        console.log(req);
    }

    async store(req, res) {
        const { errors } = validationResult(req);
        let httpStatus = 200;
        const bagError = {};
        let student = null;

        if (errors.length > 0) {
            errors.forEach((value, index, array) => {
                bagError[value.param] = value.msg;
            });
            httpStatus = 400;
        } else {
            const data = {
                'stu_ds_college_semester': req.body.semestre,
                'stu_ds_status': req.body.status,
                'stu_ds_email': req.body.email,
                'stu_ds_name': req.body.nome
            };
            student = await StudentRepository.create(data).catch((err) => {
                console.error(err);
                httpStatus = 500;
                student = null;
            });
        }

        return res.status(httpStatus).send({ student, bagError, httpStatus });
    }

    async update(req, res) {
        console.log(req);
    }

    async delete(req, res) {
        console.log(req);
    }
}

module.exports = new StudentAPIController();
