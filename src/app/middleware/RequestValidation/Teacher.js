'use strict';

const { body } = require('express-validator');
const TeacherEnum = require('../../enums/TeacherEnum');
const { Op } = require('sequelize');

const { Teacher } = require('../../models');

exports.validate = (method) => {
    switch (method) {
        case 'OnCreate': {
            return [
                body('name', 'Campo obrigatório.').notEmpty(),
                body('email').custom(email => {
                    return Teacher.findAll({ where: { tea_ds_email: email } }).then(teachers => {
                        if (teachers.length > 0) {
                            return Promise.reject(new Error('E-mail ja está em uso.'));
                        }
                    });
                }),
                body('email', 'Precisa ser um email válido.').isEmail(),
                body('email', 'Campo obrigatório.').notEmpty(),
                body('status').custom(status => {
                    const statusList = TeacherEnum.listEnumarators('STATUS');

                    if (!(statusList.includes(status))) {
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
                                tea_ds_email: email,
                                tea_id_teacher: {
                                    [Op.ne]: req.body.id
                                }
                            }
                        };

                        return Teacher.findAll(options).then(teachers => {
                            if (teachers.length > 0) {
                                return Promise.reject(new Error('E-mail ja está em uso.'));
                            }
                        });
                    } else {
                        return true;
                    }
                }),
                body('data.status').custom(status => {
                    const statusList = TeacherEnum.listEnumarators('STATUS');

                    if (status && !(statusList.includes(status))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                })
            ];
        }
    }
};
