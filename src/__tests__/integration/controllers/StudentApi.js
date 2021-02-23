const request = require('supertest');

const server = require('../../../config/server');

const truncate = require('../../utils/ClearTables'),
    createStatement = require('../../utils/CreateStatement');

module.exports = () => {
    describe('Student API Controller', () => {
        beforeAll(async () => {
            await truncate();
            await createStatement.createUser();
        });

        test('must return the student created', async () => {
            const pass = '1234567890';
            const email = 'raul.fernandes@teste.com';

            let response = await request(server).post('/api/v1/token').auth(email, pass);

            response = await request(server).post('/api/v1/student/create').send({
                'name': 'Aluno de Teste 01',
                'college_semester': '1',
                'status': '1',
                'email': 'aluno01@teste.com'
            }).set({ Authorization: `Bearer ${response.body.token}` });

            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('student');
            expect((body.student !== null)).toBe(true);
        });

        test('must return the list of students', async () => {
            const pass = '1234567890';
            const email = 'raul.fernandes@teste.com';

            let response = await request(server).post('/api/v1/token').auth(email, pass);

            response = await request(server).get('/api/v1/student/list').set({ Authorization: `Bearer ${response.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('students');
            expect((body.students.length > 0)).toBe(true);
        });

        test('must return the list of filtered students', async () => {
            const pass = '1234567890';
            const email = 'raul.fernandes@teste.com';

            let response = await request(server).post('/api/v1/token').auth(email, pass);

            response = await request(server).get('/api/v1/student/search').send({
                'name': 'Aluno de Teste 01',
                'college_semester': '1'
            }).set({ Authorization: `Bearer ${response.body.token}` });

            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('students');
            expect((body.students.length > 0)).toBe(true);
        });

        test('must return the updated student', async () => {
            const pass = '1234567890';
            const email = 'raul.fernandes@teste.com';
            const id = 1;
            const data = {
                'name': 'Aluno de Teste 001',
                'college_semester': '1',
                'status': '1',
                'email': 'aluno001@teste.com'
            };

            let response = await request(server).post('/api/v1/token').auth(email, pass);

            response = await request(server).put(`/api/v1/student/${id}/update`).send({ data }).set({ Authorization: `Bearer ${response.body.token}` });

            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('student');
            expect((body.student !== null)).toBe(true);
            expect((body.student.stu_ds_name === data.name)).toBe(true);
        });

        test('must return the informed student', async () => {
            const pass = '1234567890';
            const email = 'raul.fernandes@teste.com';
            const id = 1;

            let response = await request(server).post('/api/v1/token').auth(email, pass);

            response = await request(server).get(`/api/v1/student/${id}/show`).set({ Authorization: `Bearer ${response.body.token}` });

            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('student');
            expect((body.student !== null)).toBe(true);
            expect((body.student.stu_id_student === id)).toBe(true);
        });

        test('must return the college courses the student is enrolled in', async () => {
            const pass = '1234567890';
            const email = 'raul.fernandes@teste.com';
            const id = 1;

            let response = await request(server).post('/api/v1/token').auth(email, pass);

            response = await request(server).get(`/api/v1/student/${id}/college-course`).set({ Authorization: `Bearer ${response.body.token}` });

            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourses');
            expect((body.collegeCourses.length === 0)).toBe(true);
        });
    });
};
