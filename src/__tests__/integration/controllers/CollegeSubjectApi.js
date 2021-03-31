const request = require('supertest');

const server = require('../../../config/server');

const truncate = require('../../utils/ClearTables'),
    testMass = require('../../utils/TestMass');

let massDataTesting = {};

module.exports = () => {
    describe('College Subject API Controller', () => {
        beforeAll(async () => {
            await truncate();
            massDataTesting = await testMass.createTestMass('CollegeSubjectApi');
            massDataTesting.auth = await request(server).post('/api/v1/token').auth(massDataTesting.user.usu_ds_email, massDataTesting.userPassword);
        });

        test('must return the college subject created', async () => {
            const { auth } = massDataTesting;

            const response = await request(server).post('/api/v1/college-subject/create').send({
                name: 'Matéria de Teste 01',
                status: '1'
            }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.collegeSubject = body.collegeSubject;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeSubject');
            expect((body.collegeSubject !== null)).toBe(true);
        });

        test('must return the list of college subjects', async () => {
            const { auth } = massDataTesting;

            const response = await request(server).get('/api/v1/college-subject/list').set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeSubjects');
            expect((body.collegeSubjects.length > 0)).toBe(true);
        });

        test('must return the list of filtered college subjects', async () => {
            const { auth, collegeSubject } = massDataTesting;
            const data = {
                name: collegeSubject.cos_ds_name,
                email: collegeSubject.cos_en_status
            };

            const response = await request(server).get('/api/v1/college-subject/search').send(data).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeSubjects');
            expect((body.collegeSubjects.length > 0)).toBe(true);
        });

        test('must return the updated college subjects', async () => {
            const { auth, collegeSubject } = massDataTesting;
            const id = collegeSubject.cos_id_college_subject;
            const data = {
                name: 'Matéria de Teste 001',
                status: '1'
            };

            const response = await request(server).put(`/api/v1/college-subject/${id}/update`).send({ data }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.collegeSubject = body.collegeSubject;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeSubject');
            expect((body.collegeSubject !== null)).toBe(true);
            expect((body.collegeSubject.cos_ds_name === data.name)).toBe(true);
        });

        test('must return the informed college subject', async () => {
            const { auth, collegeSubject } = massDataTesting;
            const id = collegeSubject.cos_id_college_subject;

            const response = await request(server).get(`/api/v1/college-subject/${id}/show`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeSubject');
            expect((body.collegeSubject !== null)).toBe(true);
            expect((body.collegeSubject.cos_id_college_subject === id)).toBe(true);
        });

        test('must return the teachers associated with the college subject', async () => {
            const { auth, collegeSubject } = massDataTesting;
            const id = collegeSubject.cos_id_college_subject;

            const response = await request(server).get(`/api/v1/college-subject/${id}/teachers`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('teachers');
            expect((body.teachers.length >= 0)).toBe(true);
        });

        test('must return the removed college subject', async () => {
            const { auth, collegeSubject } = massDataTesting;
            const id = collegeSubject.cos_id_college_subject;

            const response = await request(server).delete(`/api/v1/college-subject/${id}/delete`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('deleted');
            expect(body.deleted).toBe(true);
        });
    });
};
