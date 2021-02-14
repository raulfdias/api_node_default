'use strict';

const { body } = require('express-validator'),
    { Op } = require('sequelize');

const { Student } = require('../../models');

const StudentEnum = require('../../enums/StudentEnum');

exports.validate = (method) => {
    switch (method) {
        case 'OnCreate': {
            return [
                body('name', 'Campo obrigatório.').notEmpty(),
                body('college_semester').custom(semester => {
                    const semestersList = StudentEnum.listEnumerators('COLLEGE_SEMESTER');

                    if (!(semestersList.includes(semester))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                }),
                body('college_semester', 'Campo obrigatório.').notEmpty(),
                body('email', 'Campo obrigatório.').notEmpty()
                    .bail().isEmail().withMessage('Precisa ser um email válido.')
                    .bail().custom(email => {
                        return Student.findAll({ where: { stu_ds_email: email } }).then(students => {
                            if (students.length > 0) {
                                return Promise.reject(new Error('E-mail ja está em uso.'));
                            }
                        });
                    }),
                body('status').custom(status => {
                    const statusList = StudentEnum.listEnumerators('STATUS');

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
                body('data.email').optional().isEmail().withMessage('Precisa ser um email válido.')
                    .bail().custom((email, { req }) => {
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
                    const semestersList = StudentEnum.listEnumerators('COLLEGE_SEMESTER');

                    if (semester && !(semestersList.includes(semester))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                }),
                body('status').custom(status => {
                    const statusList = StudentEnum.listEnumerators('STATUS');

                    if (status && !(statusList.includes(status))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                })
            ];
        }
        case 'OnDisAssociateCourse': {
            return [
                body('courses', 'Campo obrigatório.').notEmpty().isArray({ options: { min: 1 } })
            ];
        }
    }
};
