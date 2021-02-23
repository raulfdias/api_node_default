const request = require('supertest'),
    bcrypt = require('bcryptjs');

const server = require('../../../config/server');

const truncate = require('../../utils/ClearTables');

const UserRepository = require('../../../app/repositories/UserRepository');

module.exports = () => {
    describe('Student API Controller', () => {
        beforeAll(async () => {
            await truncate();
        });

        test('must return the list of students', async () => {
            const pass = '1234567890';
            const hash = await bcrypt.hash(pass, 10);
            const data = {
                usu_ds_name: '[DEV] Raul Fernandes',
                usu_ds_email: 'raul.fernandes@teste.com',
                usu_ds_password: hash,
                usu_en_status: '1'
            };
            const user = await UserRepository.store(data);

            let response = await request(server).post('/api/v1/token').auth(user.usu_ds_email, pass);

            response = await request(server).get('/api/v1/student/list').set({ Authorization: `Bearer ${response.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('students');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('bagError');
        });
    });
};
