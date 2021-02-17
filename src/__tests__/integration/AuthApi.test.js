const request = require('supertest'),
    bcrypt = require('bcryptjs');

const server = require('../../config/server');

const truncate = require('../utils/ClearTables');

const UserRepository = require('../../app/repositories/UserRepository');

describe('Auth API', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('must return the JWT token from valid credentials', async () => {
        const pass = '1234567890';
        const hash = await bcrypt.hash(pass, 10);
        const data = {
            usu_ds_name: '[DEV] Raul Fernandes',
            usu_ds_email: 'raul.fernandes@teste.com',
            usu_ds_password: hash,
            usu_en_status: '1'
        };
        const user = await UserRepository.store(data);

        const response = await request(server).post('/api/v1/token').auth(data.usu_ds_email, pass);
        const { body } = response;

        expect(response.status).toBe(200);
        expect(body).toHaveProperty('token');
        expect(body).toHaveProperty('expiration');
    });
});
