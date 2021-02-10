'use strict';

const { body } = require('express-validator');
const { Op } = require('sequelize');

const CollegeCourseEnum = require('../../enums/CollegeCourseEnum');
const { CollegeCourse } = require('../../models');

exports.validate = (method) => {
    switch (method) {
        case 'OnCreate': {
            return [
                body('name', 'Campo obrigatório.').notEmpty()
                    .bail().custom(name => {
                        return CollegeCourse.findAll({ where: { coc_ds_name: name } }).then(collegeCourses => {
                            if (collegeCourses.length > 0) {
                                return Promise.reject(new Error('Nome já está em uso.'));
                            }
                        });
                    }),
                body('college_course_coordinator', 'Campo obrigatório.').notEmpty()
                    .bail().isNumeric().withMessage('Valor inválido'),
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
                body('data.college_course_coordinator').optional().isNumeric().withMessage('Valor inválido'),
                body('name').optional()
                    .bail().custom((name, { req }) => {
                        if (name) {
                            const options = {
                                where: {
                                    coc_ds_name: name,
                                    coc_id_college_course: {
                                        [Op.ne]: req.body.id
                                    }
                                }
                            };

                            return CollegeCourse.findAll(options).then(collegeCourses => {
                                if (collegeCourses.length > 0) {
                                    return Promise.reject(new Error('Nome já está em uso.'));
                                }
                            });
                        } else {
                            return true;
                        }
                    }),
                body('data.status').optional().custom(status => {
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
