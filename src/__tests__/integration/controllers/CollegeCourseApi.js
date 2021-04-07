const request = require('supertest');

const server = require('../../../config/server');

const truncate = require('../../utils/ClearTables'),
    testMass = require('../../utils/TestMass');

let massDataTesting = {};

module.exports = () => {
    describe('College Course API Controller', () => {
        beforeAll(async () => {
            await truncate();
            massDataTesting = await testMass.createTestMass('CollegeCourseApi');
            massDataTesting.auth = await request(server).post('/api/v1/token').auth(massDataTesting.user.usu_ds_email, massDataTesting.userPassword);
        });

        test('must return the college course created and associated with the college coordinator', async () => {
            const { auth, collegeCourseCoordinators } = massDataTesting;
            const data = {
                name: 'Curso de Teste 01',
                status: '1',
                college_course_coordinator: collegeCourseCoordinators[0].ccc_id_college_course_coordinator
            };

            const response = await request(server).post('/api/v1/college-course/create').send(data).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.collegeCourse = body.collegeCourse;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourse');
            expect((body.collegeCourse !== null)).toBe(true);
            expect(body.collegeCourse).toHaveProperty('college_course_coordinator');
            expect((body.collegeCourse.college_course_coordinator !== null)).toBe(true);
        });

        test('must return the college course created and without association to the college coordinator', async () => {
            const { auth } = massDataTesting;

            const response = await request(server).post('/api/v1/college-course/create').send({
                name: 'Curso de Teste 02',
                status: '1'
            }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourse');
            expect((body.collegeCourse !== null)).toBe(true);
            expect(body.collegeCourse).toHaveProperty('college_course_coordinator');
            expect((body.collegeCourse.college_course_coordinator === null)).toBe(true);
        });

        test('must return the list of college courses', async () => {
            const { auth } = massDataTesting;

            const response = await request(server).get('/api/v1/college-course/list').set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourses');
            expect((body.collegeCourses.length > 0)).toBe(true);
        });

        test('must return the list of filtered college courses', async () => {
            const { auth, collegeCourse } = massDataTesting;

            const response = await request(server).get('/api/v1/college-course/search').send({
                name: collegeCourse.coc_ds_name,
                status: '1'
            }).set({ Authorization: `Bearer ${auth.body.token}` });

            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourses');
            expect((body.collegeCourses.length > 0)).toBe(true);
        });

        test('must return the updated college course', async () => {
            const { auth, collegeCourse } = massDataTesting;
            const id = collegeCourse.coc_id_college_course;
            const data = {
                name: 'Curso de Teste 001',
                status: '1'
            };

            const response = await request(server).put(`/api/v1/college-course/${id}/update`).send({ data }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.collegeCourse = body.collegeCourse;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourse');
            expect((body.collegeCourse !== null)).toBe(true);
            expect((body.collegeCourse.coc_ds_name === data.name)).toBe(true);
        });

        test('must return the informed college course', async () => {
            const { auth, collegeCourse } = massDataTesting;
            const id = collegeCourse.coc_id_college_course;

            const response = await request(server).get(`/api/v1/college-course/${id}/show`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourse');
            expect((body.collegeCourse !== null)).toBe(true);
            expect((body.collegeCourse.coc_id_college_course === id)).toBe(true);
        });

        test('must return the college course that the college subject was enrolled in', async () => {
            const { auth, collegeCourse, collegeSubjects } = massDataTesting;
            const id = collegeCourse.coc_id_college_course;
            const collegeCourseSubjects = [];

            collegeSubjects.map((collegeSubject, i) => {
                return collegeCourseSubjects.push(collegeSubject.cos_id_college_subject);
            });

            const response = await request(server).post(`/api/v1/college-course/${id}/college-subject/connect`).send({ subjects: collegeCourseSubjects }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.collegeCourseSubjects = collegeCourseSubjects;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourse');
            expect(((Object.keys(body.collegeCourse).length) > 0)).toBe(true);
            expect(body.collegeCourse).toHaveProperty('college_subjects');
            expect(((Object.keys(body.collegeCourse.college_subjects).length) === (collegeCourseSubjects.length))).toBe(true);
        });

        test('must return the college subjects that the college course is enrolled in', async () => {
            const { auth, collegeCourse, collegeCourseSubjects } = massDataTesting;
            const id = collegeCourse.coc_id_college_course;

            const response = await request(server).get(`/api/v1/college-course/${id}/college-subjects`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeSubjects');
            expect((body.collegeSubjects.length === collegeCourseSubjects.length)).toBe(true);
        });

        test('must return the students that the college course is enrolled in', async () => {
            const { auth, collegeCourse, students } = massDataTesting;
            let id = students[0].stu_id_student;
            const data = [{
                course: collegeCourse.coc_id_college_course,
                period: '1'
            }];

            let response = await request(server).post(`/api/v1/student/${id}/college-course/connect`).send({ courses: data }).set({ Authorization: `Bearer ${auth.body.token}` });
            id = collegeCourse.coc_id_college_course;
            response = await request(server).get(`/api/v1/college-course/${id}/students`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('students');
            expect((body.students.length > 0)).toBe(true);
        });

        test('must to test the removal of the college course\'s enrollment from the college subject', async () => {
            const { auth, collegeCourse, collegeCourseSubjects } = massDataTesting;
            const id = collegeCourse.coc_id_college_course;
            const totalEnrollment = collegeCourseSubjects.length;

            const subjects = [
                collegeCourseSubjects[0]
            ];

            const response = await request(server).put(`/api/v1/college-course/${id}/college-subject/disconnect`).send({ subjects }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.collegeCourseSubjects = collegeCourseSubjects.shift();

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourse');
            expect(((Object.keys(body.collegeCourse).length) > 0)).toBe(true);
            expect(body.collegeCourse).toHaveProperty('college_subjects');
            expect(((Object.keys(body.collegeCourse.college_subjects).length) === (totalEnrollment - (subjects.length)))).toBe(true);
        });

        test('must return the removed college course', async () => {
            const { auth, collegeCourse } = massDataTesting;
            const id = collegeCourse.coc_id_college_course;

            const response = await request(server).delete(`/api/v1/college-course/${id}/delete`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('deleted');
            expect(body.deleted).toBe(true);
        });
    });
};
