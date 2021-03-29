const request = require('supertest');

const server = require('../../../config/server');

const truncate = require('../../utils/ClearTables'),
    testMass = require('../../utils/TestMass');

let mass = {};

module.exports = () => {
    describe('Auth API Controller 01', () => {
        beforeAll(async () => {
            await truncate();
            mass = await testMass.createTestMass('AuthApi');
        });

        test('must return the JWT token from valid credentials', async () => {
            const { user, userPassword } = mass;

            const response = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('token');
            expect((body.token !== null)).toBe(true);
            expect(body).toHaveProperty('expiration');
            expect((body.expiration !== null)).toBe(true);
        });

        test('must return error from unknown email', async () => {
            const { userPassword } = mass;
            const email = 'raul.fernandesss@teste.com';

            const response = await request(server).post('/api/v1/token').auth(email, userPassword);
            const { body } = response;

            expect(response.status).toBe(400);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message !== null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('expiration');
            expect(body).toHaveProperty('token');
            expect(body.token).toBe(null);
        });

        test('must return error from invalid password', async () => {
            const { user } = mass;
            const pass = '123';

            const response = await request(server).post('/api/v1/token').auth(user.usu_ds_email, pass);
            const { body } = response;

            expect(response.status).toBe(401);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message !== null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('expiration');
            expect(body).toHaveProperty('token');
            expect(body.token).toBe(null);
        });
    });
};
