'use strict';

const { body } = require('express-validator');
const { Op } = require('sequelize');

const CollegeSubjectEnum = require('../../enums/CollegeSubjectEnum');
const { CollegeSubject } = require('../../models');

exports.validate = (method) => {
    switch (method) {
        case 'OnCreate': {
            return [
                body('name', 'Campo obrigatório.').notEmpty()
                    .bail().custom(name => {
                        return CollegeSubject.findAll({ where: { cos_ds_name: name } }).then(collegeSubjects => {
                            if (collegeSubjects.length > 0) {
                                return Promise.reject(new Error('Nome já está em uso.'));
                            }
                        });
                    }),
                body('status').custom(status => {
                    const statusList = CollegeSubjectEnum.listEnumarators('STATUS');

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
                body('name').optional()
                    .bail().custom((name, { req }) => {
                        if (name) {
                            const options = {
                                where: {
                                    cos_ds_name: name,
                                    cos_id_college_subject: {
                                        [Op.ne]: req.body.id
                                    }
                                }
                            };

                            return CollegeSubject.findAll(options).then(collegeSubjects => {
                                if (collegeSubjects.length > 0) {
                                    return Promise.reject(new Error('Nome já está em uso.'));
                                }
                            });
                        } else {
                            return true;
                        }
                    }),
                body('data.status').optional().custom(status => {
                    const statusList = CollegeSubjectEnum.listEnumarators('STATUS');

                    if (status && !(statusList.includes(status))) {
                        return Promise.reject(new Error('Valor inválido.'));
                    }

                    return true;
                })
            ];
        }
    }
};
