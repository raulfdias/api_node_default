const request = require('supertest');

const server = require('../../../config/server');

const truncate = require('../../utils/ClearTables'),
    testMass = require('../../utils/TestMass');

let massDataTesting = {};

module.exports = () => {
    describe('College Course Coordinator API Controller', () => {
        beforeAll(async () => {
            await truncate();
            massDataTesting = await testMass.createTestMass('CollegeCourseCoordinatorApi');
            massDataTesting.auth = await request(server).post('/api/v1/token').auth(massDataTesting.user.usu_ds_email, massDataTesting.userPassword);
        });

        test('must return the college course coordinator created', async () => {
            const { auth } = massDataTesting;
            const data = {
                name: 'Coordenador de Teste 01',
                email: 'coordenador01@teste.com',
                status: '1'
            };

            const response = await request(server).post('/api/v1/college-course-coordinator/create').send(data).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.collegeCourseCoordinator = body.collegeCourseCoordinator;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourseCoordinator');
            expect((body.collegeCourseCoordinator !== null)).toBe(true);
        });

        test('must return the list of college course coordinators', async () => {
            const { auth } = massDataTesting;

            const response = await request(server).get('/api/v1/college-course-coordinator/list').set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourseCoordinators');
            expect((body.collegeCourseCoordinators.length > 0)).toBe(true);
        });

        test('must return the list of filtered college courses coordinators', async () => {
            const { auth, collegeCourseCoordinator } = massDataTesting;
            const data = {
                name: collegeCourseCoordinator.ccc_ds_name,
                status: '1'
            };

            const response = await request(server).get('/api/v1/college-course-coordinator/search').send(data).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourseCoordinators');
            expect((body.collegeCourseCoordinators.length > 0)).toBe(true);
        });

        test('must return the updated college course coordinator', async () => {
            const { auth, collegeCourseCoordinator } = massDataTesting;
            const id = collegeCourseCoordinator.ccc_id_college_course_coordinator;
            const data = {
                name: 'Coordenador de Teste 001',
                status: '1'
            };

            const response = await request(server).put(`/api/v1/college-course-coordinator/${id}/update`).send({ data }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.collegeCourseCoordinator = body.collegeCourseCoordinator;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourseCoordinator');
            expect((body.collegeCourseCoordinator !== null)).toBe(true);
            expect((body.collegeCourseCoordinator.ccc_ds_name === data.name)).toBe(true);
        });

        test('must return the informed college course coordinator', async () => {
            const { auth, collegeCourseCoordinator } = massDataTesting;
            const id = collegeCourseCoordinator.ccc_id_college_course_coordinator;

            const response = await request(server).get(`/api/v1/college-course-coordinator/${id}/show`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourseCoordinator');
            expect((body.collegeCourseCoordinator !== null)).toBe(true);
            expect((body.collegeCourseCoordinator.ccc_id_college_course_coordinator === id)).toBe(true);
        });

        test('must return the college course that the college course coordinator was enrolled in', async () => {
            const { auth, collegeCourseCoordinator, collegeCourses } = massDataTesting;
            let id = collegeCourses[0].coc_id_college_course;
            const data = {
                college_course_coordinator: collegeCourseCoordinator.ccc_id_college_course_coordinator
            };

            let response = await request(server).put(`/api/v1/college-course/${id}/update`).send({ data }).set({ Authorization: `Bearer ${auth.body.token}` });
            id = collegeCourseCoordinator.ccc_id_college_course_coordinator;
            response = await request(server).get(`/api/v1/college-course-coordinator/${id}/college-courses`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourse');
            expect(body.collegeCourse !== null).toBe(true);
        });

        test('must return the removed college course coordinator', async () => {
            const { auth, collegeCourseCoordinator } = massDataTesting;
            const id = collegeCourseCoordinator.ccc_id_college_course_coordinator;

            const response = await request(server).delete(`/api/v1/college-course-coordinator/${id}/delete`).set({ Authorization: `Bearer ${auth.body.token}` });
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
