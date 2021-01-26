const { body } = require('express-validator');
const { Op } = require('sequelize');

const { Student } = require('../../models');

exports.validate = (method) => {
    switch (method) {
        case 'OnCreate': {
            return [
                body('name', 'Campo obrigatório.').notEmpty(),
                body('college_semester').custom(semester => {
                    if (!(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(semester))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                }),
                body('college_semester', 'Campo obrigatório.').notEmpty(),
                body('email').custom(email => {
                    return Student.findAll({ where: { stu_ds_email: email } }).then(students => {
                        if (students.length > 0) {
                            return Promise.reject(new Error('E-mail ja está em uso.'));
                        }
                    });
                }),
                body('email', 'Precisa ser um email válido.').isEmail(),
                body('email', 'Campo obrigatório.').notEmpty(),
                body('status').custom(status => {
                    if (!(['1', '0'].includes(status))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                }),
                body('status', 'Campo obrigatório.').notEmpty()
            ];
        }
        case 'OnUpdate': {
            return [
                body('data', 'Campo obrigatório.').notEmpty(),
                body('data.email', 'Precisa ser um email válido.').optional().isEmail().bail().custom((email, { req }) => {
                    if (email) {
                        const options = {
                            where: {
                                stu_ds_email: email,
                                stu_id_student: {
                                    [Op.ne]: req.body.id
                                }
                            }
                        };

                        return Student.findAll(options).then(students => {
                            if (students.length > 0) {
                                return Promise.reject(new Error('E-mail ja está em uso.'));
                            }
                        });
                    } else {
                        return true;
                    }
                }),
                body('college_semester').custom(semester => {
                    if (semester && !(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(semester))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                }),
                body('status').custom(status => {
                    if (status && !(['1', '0'].includes(status))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                })
            ];
        }
    }
};
