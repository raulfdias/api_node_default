const bcrypt = require('bcryptjs');

const UserRepository = require('../../app/repositories/UserRepository');

module.exports = {
    createUser: async () => {
        const pass = '1234567890';
        const hash = await bcrypt.hash(pass, 10);
        const data = {
            usu_ds_name: '[DEV] Raul Fernandes',
            usu_ds_email: 'raul.fernandes@teste.com',
            usu_ds_password: hash,
            usu_en_status: '1'
        };

        return await UserRepository.store(data);
    }
};
