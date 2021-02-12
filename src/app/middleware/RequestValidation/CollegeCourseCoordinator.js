'use strict';

const { body } = require('express-validator'),
    { Op } = require('sequelize');

const CollegeCourseCoordinatorEnum = require('../../enums/CollegeCourseCoordinatorEnum');

const { CollegeCourseCoordinator } = require('../../models');

exports.validate = (method) => {
    switch (method) {
        case 'OnCreate': {
            return [
                body('name', 'Campo obrigatório.').notEmpty(),
                body('email').custom(email => {
                    return CollegeCourseCoordinator.findAll({ where: { ccc_ds_email: email } }).then(collegeCourseCoordinators => {
                        if (collegeCourseCoordinators.length > 0) {
                            return Promise.reject(new Error('E-mail ja está em uso.'));
                        }
                    });
                }),
                body('email', 'Precisa ser um email válido.').isEmail(),
                body('email', 'Campo obrigatório.').notEmpty(),
                body('status').custom(status => {
                    const statusList = CollegeCourseCoordinatorEnum.listEnumerators('STATUS');

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
                                ccc_ds_email: email,
                                ccc_id_college_course_coordinator: {
                                    [Op.ne]: req.body.id
                                }
                            }
                        };

                        return CollegeCourseCoordinator.findAll(options).then(collegeCourseCoordinators => {
                            if (collegeCourseCoordinators.length > 0) {
                                return Promise.reject(new Error('E-mail ja está em uso.'));
                            }
                        });
                    } else {
                        return true;
                    }
                }),
                body('data.status').custom(status => {
                    const statusList = CollegeCourseCoordinatorEnum.listEnumerators('STATUS');

                    if (status && !(statusList.includes(status))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                })
            ];
        }
    }
};
