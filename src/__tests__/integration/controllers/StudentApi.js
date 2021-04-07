const request = require('supertest');

const server = require('../../../config/server');

const truncate = require('../../utils/ClearTables'),
    testMass = require('../../utils/TestMass');

let massDataTesting = {};

module.exports = () => {
    describe('Student API Controller', () => {
        beforeAll(async () => {
            await truncate();
            massDataTesting = await testMass.createTestMass('StudentApi');
            massDataTesting.auth = await request(server).post('/api/v1/token').auth(massDataTesting.user.usu_ds_email, massDataTesting.userPassword);
        });

        test('must return the student created', async () => {
            const { auth } = massDataTesting;
            const data = {
                name: 'Aluno de Teste 01',
                college_semester: '1',
                status: '1',
                email: 'aluno01@teste.com'
            };

            const response = await request(server).post('/api/v1/student/create').send(data).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.student = body.student;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('student');
            expect((body.student !== null)).toBe(true);
        });

        test('must return the list of students', async () => {
            const { auth } = massDataTesting;

            const response = await request(server).get('/api/v1/student/list').set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('students');
            expect((body.students.length > 0)).toBe(true);
        });

        test('must return the list of filtered students', async () => {
            const { auth, student } = massDataTesting;
            const data = {
                name: student.stu_ds_name,
                college_semester: student.stu_en_college_semester
            };

            const response = await request(server).get('/api/v1/student/search').send(data).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('students');
            expect((body.students.length > 0)).toBe(true);
        });

        test('must return the updated student', async () => {
            const { auth, student } = massDataTesting;
            const id = student.stu_id_student;
            const data = {
                name: 'Aluno de Teste 001',
                college_semester: '1',
                status: '1',
                email: 'aluno001@teste.com'
            };

            const response = await request(server).put(`/api/v1/student/${id}/update`).send({ data }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('student');
            expect((body.student !== null)).toBe(true);
            expect((body.student.stu_ds_name === data.name)).toBe(true);
        });

        test('must return the informed student', async () => {
            const { auth, student } = massDataTesting;
            const id = student.stu_id_student;

            const response = await request(server).get(`/api/v1/student/${id}/show`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('student');
            expect((body.student !== null)).toBe(true);
            expect((body.student.stu_id_student === id)).toBe(true);
        });

        test('must return the college course that the student was enrolled in', async () => {
            const { auth, collegeCourses, student } = massDataTesting;
            const id = student.stu_id_student;
            const periods = ['1', '2', '3'];
            const studentCourses = [];

            collegeCourses.map((collegeCourse, i) => {
                return studentCourses.push({
                    course: collegeCourse.coc_id_college_course,
                    period: periods[i] ?? '1'
                });
            });

            const response = await request(server).post(`/api/v1/student/${id}/college-course/connect`).send({ courses: studentCourses }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.studentCourses = studentCourses;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('student');
            expect(((Object.keys(body.student).length) > 0)).toBe(true);
            expect(body.student).toHaveProperty('college_courses');
            expect(((Object.keys(body.student.college_courses).length) === (studentCourses.length))).toBe(true);
        });

        test('must return the college courses the student is enrolled in', async () => {
            const { auth, student, studentCourses } = massDataTesting;
            const id = student.stu_id_student;

            const response = await request(server).get(`/api/v1/student/${id}/college-course`).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('collegeCourses');
            expect((body.collegeCourses.length === studentCourses.length)).toBe(true);
        });

        test('must to test the removal of the student\'s enrollment from the college course', async () => {
            const { auth, student, studentCourses } = massDataTesting;
            const id = student.stu_id_student;
            const totalEnrollment = studentCourses.length;

            const courses = [
                studentCourses[0].course
            ];

            const response = await request(server).put(`/api/v1/student/${id}/college-course/disconnect`).send({ courses }).set({ Authorization: `Bearer ${auth.body.token}` });
            const { body } = response;

            massDataTesting.studentCourses = studentCourses.shift();

            expect(response.status).toBe(200);
            expect(body).toHaveProperty('message');
            expect((body.message === null)).toBe(true);
            expect(body).toHaveProperty('bagError');
            expect(((Object.keys(body.bagError).length) === 0)).toBe(true);

            expect(body).toHaveProperty('student');
            expect(((Object.keys(body.student).length) > 0)).toBe(true);
            expect(body.student).toHaveProperty('college_courses');
            expect(((Object.keys(body.student.college_courses).length) === (totalEnrollment - (courses.length)))).toBe(true);
        });

        test('must return the removed student', async () => {
            const { auth, student } = massDataTesting;
            const id = student.stu_id_student;

            const response = await request(server).delete(`/api/v1/student/${id}/delete`).set({ Authorization: `Bearer ${auth.body.token}` });
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
