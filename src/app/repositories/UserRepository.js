'use strict';

const bcrypt = require('bcryptjs');

const { User } = require('../models');

class UserRepository {
    async findById(id, { include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (include.length > 0) options.include = include;

        return await User.findByPk((parseInt(id)), options);
    }

    async findFirst({ attributes = [], where = {}, order = [], include = [], transaction = {} } = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;
        if (attributes.length > 0) options.attributes = attributes;
        if (Object.keys(where).length > 0) options.where = where;
        if (include.length > 0) options.include = include;
        if (order.length > 0) options.order = order;

        return await User.findOne(options);
    }

    async store(data, transaction = {}) {
        const options = {};
        if (Object.keys(transaction).length > 0) options.transaction = transaction;

        return await User.create(data, options);
    }

    async checkPassword(password, userPassword) {
        return bcrypt.compare(password, userPassword);
    }
}

module.exports = new UserRepository();
