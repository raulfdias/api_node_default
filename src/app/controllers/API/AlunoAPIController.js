const AlunoRepository = require('../../repositories/AlunoRepository');
const { validationResult } = require('express-validator');
const e = require('express');

class AlunoAPIController {
    async list(req, res) {
        const alunos = await AlunoRepository.findAll();

        return res.json(alunos);
    }

    async search(req, res) {
        console.log(req);
    }

    async show(req, res) {
        console.log(req);
    }

    async store(req, res) {
        let { errors } = validationResult(req);
        if (errors.length > 0) {
            const errorList = [];

            errors.forEach((value, index, array) => {
                errorList[value.param] = value.msg;
            });
            errors = errorList;

            return res.json(errors);
        }
    }

    async update(req, res) {
        console.log(req);
    }

    async delete(req, res) {
        console.log(req);
    }
}

module.exports = new AlunoAPIController();
