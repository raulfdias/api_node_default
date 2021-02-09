'use strict';

const { body } = require('express-validator');
const CollegeCourseEnum = require('../../enums/CollegeCourseEnum');

exports.validate = (method) => {
    switch (method) {
        case 'OnCreate': {
            return [
                body('name', 'Campo obrigatório.').notEmpty(),
                body('college_course_coordinator', 'Campo obrigatório.').notEmpty()
                    .bail()
                    .isNumeric().withMessage('Valor inválido'),
                body('status').custom(status => {
                    const statusList = CollegeCourseEnum.listEnumarators('STATUS');

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
                body('data.status').custom(status => {
                    const statusList = CollegeCourseEnum.listEnumarators('STATUS');

                    if (status && !(statusList.includes(status))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                })
            ];
        }
    }
};
