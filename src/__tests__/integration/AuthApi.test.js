const request = require('supertest'),
    bcrypt = require('bcryptjs');

const server = require('../../config/server');

const truncate = require('../utils/ClearTables');

const UserRepository = require('../../app/repositories/UserRepository');

describe('Auth API Controller', () => {
    beforeEach(async () => {
        await truncate();
    });

    test('must return the JWT token from valid credentials', async () => {
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

    test('must return error from unknown email', async () => {
        const pass = '1234567890';
        const email = 'raul.fernandes@teste.com';

        const response = await request(server).post('/api/v1/token').auth(email, pass);
        const { body } = response;

        expect(response.status).toBe(404);
        expect(body).toHaveProperty('token');
        expect(body.token).toBe(null);
    });

    test('must return error from invalid password', async () => {
        const pass = '1234567890';
        const hash = await bcrypt.hash(pass, 10);
        const data = {
            usu_ds_name: '[DEV] Raul Fernandes',
            usu_ds_email: 'raul.fernandes@teste.com',
            usu_ds_password: hash,
            usu_en_status: '1'
        };
        const user = await UserRepository.store(data);

        const response = await request(server).post('/api/v1/token').auth(user.usu_ds_email, '1234');
        const { body } = response;

        expect(response.status).toBe(401);
        expect(body).toHaveProperty('token');
        expect(body.token).toBe(null);
    });
});
