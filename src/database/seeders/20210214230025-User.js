'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const pass = await bcrypt.hash('1234567890', 10);

        await queryInterface.bulkInsert('User', [{
            usu_ds_name: '[DEV] Raul Fernandes',
            usu_ds_email: 'raul.fernandes@teste.com',
            usu_ds_password: pass,
            usu_en_status: '1'
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
