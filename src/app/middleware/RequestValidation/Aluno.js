const { check } = require('express-validator');

const Aluno = require('../../models/Aluno');

exports.validate = (method) => {
    switch (method) {
        case 'OnCreate': {
            return [
                check('nome', 'Campo obrigatório.').notEmpty(),
                check('semestre', 'Campo obrigatório.').notEmpty(),
                check('status', 'Campo obrigatório.').notEmpty(),
                check('email', 'Campo obrigatório.').notEmpty(),
                check('email', 'Precisa ser um email válido.').isEmail(),
                check('email').custom(email => {
                    return Aluno.findAll({ where: { alu_ds_email: email } }).then(alunos => {
                        if (alunos.length > 0) {
                            return Promise.reject(new Error('E-mail ja está em uso.'));
                        }
                    });
                })
                // check('password_confirmation').custom((passwordConfirmation, { req }) => {
                //     if (passwordConfirmation !== req.body.password) {
                //         return Promise.reject(new Error('A senha precisa ser igual a confirmação de senha.'));
                //     } else {
                //         return true;
                //     }
                // })
            ];
        }
        case 'OnUpdate': {
            return [
                check('nome', 'Campo obrigatório.').notEmpty(),
                check('semestre', 'Campo obrigatório.').notEmpty(),
                check('status', 'Campo obrigatório.').notEmpty(),
                check('email', 'Campo obrigatório.').notEmpty(),
                check('email', 'Precisa ser um email válido.').isEmail()
            ];
        }
    }
};
