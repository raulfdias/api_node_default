const request = require('supertest');

const server = require('../../../config/server');

const truncate = require('../../utils/ClearTables'),
    testMass = require('../../utils/TestMass');

let massDataTesting = {};

module.exports = () => {
    describe('Teacher API Controller', () => {
        beforeAll(async () => {
            await truncate();
            massDataTesting = await testMass.createTestMass('TeacherApi');
        });

        test('must return the teacher created', async () => {
            const { user, userPassword } = massDataTesting;

            const auth = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);

            const response = await request(server).post('/api/v1/teacher/create').send({
                'name': 'Professor de Teste 01',
                'status': '1',
                'email': 'professor01@teste.com'
            }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.teacher = body.teacher;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('teacher');
            expect((body.teacher !== null)).toBe(true);
        });

        test('must return the list of teachers', async () => {
            const { user, userPassword } = massDataTesting;

            const auth = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);

            const response = await request(server).get('/api/v1/teacher/list').set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('teachers');
            expect((body.teachers.length > 0)).toBe(true);
        });

        test('must return the list of filtered teachers', async () => {
            const { user, userPassword, teacher } = massDataTesting;

            const auth = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);

            const response = await request(server).get('/api/v1/teacher/search').send({
                'name': teacher.tea_ds_name,
                'email': teacher.tea_ds_email
            }).set({ Authorization: `Bearer ${auth.body.token}` });

            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('teachers');
            expect((body.teachers.length > 0)).toBe(true);
        });

        test('must return the updated teacher', async () => {
            const { user, userPassword, teacher } = massDataTesting;
            const id = teacher.tea_id_teacher;
            const data = {
                'name': 'Professor de Teste 001',
                'status': '1',
                'email': 'professor001@teste.com'
            };

            const auth = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);

            const response = await request(server).put(`/api/v1/teacher/${id}/update`).send({ data }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.teacher = body.teacher;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('teacher');
            expect((body.teacher !== null)).toBe(true);
            expect((body.teacher.tea_ds_name === data.name)).toBe(true);
        });

        test('must return the informed teacher', async () => {
            const { user, userPassword, teacher } = massDataTesting;
            const id = teacher.tea_id_teacher;

            const auth = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);

            const response = await request(server).get(`/api/v1/teacher/${id}/show`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('teacher');
            expect((body.teacher !== null)).toBe(true);
            expect((body.teacher.tea_id_teacher === id)).toBe(true);
        });

        test('must return the college subject that the teacher was enrolled in', async () => {
            const { user, userPassword, collegeSubjects, teacher } = massDataTesting;
            const id = teacher.tea_id_teacher;
            const teacherSubjects = [];

            const auth = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);

            collegeSubjects.map((collegeSubject, i) => {
                return teacherSubjects.push(collegeSubject.cos_id_college_subject);
            });

            const response = await request(server).post(`/api/v1/teacher/${id}/college-subjects/connect`).send({ subjects: teacherSubjects }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.teacherSubjects = teacherSubjects;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('teacher');
            expect(((Object.keys(body.teacher).length) > 0)).toBe(true);
            expect(body.teacher).toHaveProperty('college_subjects');
            expect(((Object.keys(body.teacher.college_subjects).length) === (teacherSubjects.length))).toBe(true);
        });

        test('must return the college subject that the teacher is enrolled in', async () => {
            const { user, userPassword, teacher, teacherSubjects } = massDataTesting;
            const id = teacher.tea_id_teacher;

            const auth = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);

            const response = await request(server).get(`/api/v1/teacher/${id}/college-subjects`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeSubjects');
            expect((body.collegeSubjects.length === teacherSubjects.length)).toBe(true);
        });

        test('must to test the removal of the teacher\'s enrollment from the college subject', async () => {
            const { user, userPassword, teacher, teacherSubjects } = massDataTesting;
            const id = teacher.tea_id_teacher;
            const totalEnrollment = teacherSubjects.length;

            const subjects = [
                teacherSubjects[0]
            ];

            const auth = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);

            const response = await request(server).put(`/api/v1/teacher/${id}/college-subjects/disconnect`).send({ subjects }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.teacherSubjects = teacherSubjects.shift();

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('httpStatus');
            expect((body.httpStatus !== null)).toBe(true);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('teacher');
            expect(((Object.keys(body.teacher).length) > 0)).toBe(true);
            expect(body.teacher).toHaveProperty('college_subjects');
            expect(((Object.keys(body.teacher.college_subjects).length) === (totalEnrollment - (subjects.length)))).toBe(true);
        });

        test('must return the removed teacher', async () => {
            const { user, userPassword, teacher } = massDataTesting;
            const id = teacher.tea_id_teacher;

            const auth = await request(server).post('/api/v1/token').auth(user.usu_ds_email, userPassword);

            const response = await request(server).delete(`/api/v1/teacher/${id}/delete`).set({ Authorization: `Bearer ${auth.body.token}` });
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
