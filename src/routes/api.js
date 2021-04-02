const express = require('express'),
    routes = express.Router();

// =======================MIDDLEWARE =======================
const AuthToken = require('../app/middleware/AuthToken'),
    StudentValidator = require('../app/middleware/RequestValidation/Student'),
    TeacherValidator = require('../app/middleware/RequestValidation/Teacher'),
    CollegeCourseCoordinatorValidator = require('../app/middleware/RequestValidation/CollegeCourseCoordinator'),
    CollegeSubjectValidator = require('../app/middleware/RequestValidation/CollegeSubject'),
    CollegeCourseValidator = require('../app/middleware/RequestValidation/CollegeCourse');
// =======================FIM MIDDLEWARE =======================

// =======================CONTROLLERS =======================
const AuthAPIController = require('../app/controllers/API/AuthAPIController'),
    StudentAPIController = require('../app/controllers/API/StudentAPIController'),
    TeacherAPIController = require('../app/controllers/API/TeacherAPIController'),
    CollegeCourseCoordinatorAPIController = require('../app/controllers/API/CollegeCourseCoordinatorAPIController'),
    CollegeSubjectAPIController = require('../app/controllers/API/CollegeSubjectAPIController'),
    CollegeCourseAPIController = require('../app/controllers/API/CollegeCourseAPIController');
// =======================FIM CONTROLLERS =======================

// =============================================== ROUTES ===============================================

// =======================ROTAS DE TOKEN =======================
/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoint de autenticação
 */
routes.post('/api/v1/token', AuthAPIController.generateToken);
// =======================FIM ROTAS DE TOKEN =======================

// =======================ROTAS DE ESTUDANTE =======================
routes.get('/api/v1/student/list', [
    AuthToken
], StudentAPIController.list);

routes.post('/api/v1/student/create', [
    AuthToken,
    StudentValidator.validate('OnCreate')
], StudentAPIController.store);

routes.put('/api/v1/student/:id/update', [
    AuthToken,
    StudentValidator.validate('OnUpdate')
], StudentAPIController.update);

routes.delete('/api/v1/student/:id/delete', [
    AuthToken
], StudentAPIController.delete);

routes.get('/api/v1/student/search', [
    AuthToken
], StudentAPIController.search);

routes.get('/api/v1/student/:id/show', [
    AuthToken
], StudentAPIController.show);

routes.post('/api/v1/student/:id/college-course/connect', [
    AuthToken,
    StudentValidator.validate('OnDisAssociateCourse')
], StudentAPIController.associateCollegeCurses);

routes.put('/api/v1/student/:id/college-course/disconnect', [
    AuthToken,
    StudentValidator.validate('OnDisAssociateCourse')
], StudentAPIController.disassociateCollegeCurses);

routes.get('/api/v1/student/:id/college-course', [
    AuthToken
], StudentAPIController.getAllCollegeCourse);
// =======================FIM ROTAS DE ESTUDANTE =======================

// =======================ROTAS DE PROFESSOR =======================
routes.get('/api/v1/teacher/list', [
    AuthToken
], TeacherAPIController.list);

routes.post('/api/v1/teacher/create', [
    AuthToken,
    TeacherValidator.validate('OnCreate')
], TeacherAPIController.store);

routes.put('/api/v1/teacher/:id/update', [
    AuthToken,
    TeacherValidator.validate('OnUpdate')
], TeacherAPIController.update);

routes.delete('/api/v1/teacher/:id/delete', [
    AuthToken
], TeacherAPIController.delete);

routes.get('/api/v1/teacher/search', [
    AuthToken
], TeacherAPIController.search);

routes.get('/api/v1/teacher/:id/show', [
    AuthToken
], TeacherAPIController.show);

routes.post('/api/v1/teacher/:id/college-subjects/connect', [
    AuthToken,
    TeacherValidator.validate('OnDisAssociateSubject')
], TeacherAPIController.associateCollegeSubject);

routes.put('/api/v1/teacher/:id/college-subjects/disconnect', [
    AuthToken,
    TeacherValidator.validate('OnDisAssociateSubject')
], TeacherAPIController.disassociateCollegeSubject);

routes.get('/api/v1/teacher/:id/college-subjects', [
    AuthToken
], TeacherAPIController.getAllCollegeSubject);
// =======================FIM ROTAS DE PROFESSOR =======================

// =======================ROTAS DE COORDENADOR DE CURSO =======================
routes.get('/api/v1/college-course-coordinator/list', [
    AuthToken
], CollegeCourseCoordinatorAPIController.list);

routes.post('/api/v1/college-course-coordinator/create', [
    AuthToken,
    CollegeCourseCoordinatorValidator.validate('OnCreate')
], CollegeCourseCoordinatorAPIController.store);

routes.put('/api/v1/college-course-coordinator/:id/update', [
    AuthToken,
    CollegeCourseCoordinatorValidator.validate('OnUpdate')
], CollegeCourseCoordinatorAPIController.update);

routes.delete('/api/v1/college-course-coordinator/:id/delete', [
    AuthToken
], CollegeCourseCoordinatorAPIController.delete);

routes.get('/api/v1/college-course-coordinator/search', [
    AuthToken
], CollegeCourseCoordinatorAPIController.search);

routes.get('/api/v1/college-course-coordinator/:id/show', [
    AuthToken
], CollegeCourseCoordinatorAPIController.show);

routes.get('/api/v1/college-course-coordinator/:id/college-courses', [
    AuthToken
], CollegeCourseCoordinatorAPIController.getCollegeCourseFromCoordinator);
// =======================FIM ROTAS DE COORDENADOR DE CURSO =======================

// =======================ROTAS DE MATÉRIAS DE CURSO =======================
routes.get('/api/v1/college-subject/list', [
    AuthToken
], CollegeSubjectAPIController.list);

routes.post('/api/v1/college-subject/create', [
    AuthToken,
    CollegeSubjectValidator.validate('OnCreate')
], CollegeSubjectAPIController.store);

routes.put('/api/v1/college-subject/:id/update', [
    AuthToken,
    CollegeSubjectValidator.validate('OnUpdate')
], CollegeSubjectAPIController.update);

routes.delete('/api/v1/college-subject/:id/delete', [
    AuthToken
], CollegeSubjectAPIController.delete);

routes.get('/api/v1/college-subject/search', [
    AuthToken
], CollegeSubjectAPIController.search);

routes.get('/api/v1/college-subject/:id/show', [
    AuthToken
], CollegeSubjectAPIController.show);

routes.get('/api/v1/college-subject/:id/teachers', [
    AuthToken
], CollegeSubjectAPIController.getAllTeacher);

// =======================FIM ROTAS DE MATÉRIAS DE CURSO =======================

// =======================ROTAS DE CRUSOS =======================
routes.get('/api/v1/college-course/list', [
    AuthToken
], CollegeCourseAPIController.list);

routes.post('/api/v1/college-course/create', [
    AuthToken,
    CollegeCourseValidator.validate('OnCreate')
], CollegeCourseAPIController.store);

routes.put('/api/v1/college-course/:id/update', [
    AuthToken,
    CollegeCourseValidator.validate('OnUpdate')
], CollegeCourseAPIController.update);

routes.delete('/api/v1/college-course/:id/delete', [
    AuthToken
], CollegeCourseAPIController.delete);

routes.get('/api/v1/college-course/search', [
    AuthToken
], CollegeCourseAPIController.search);

routes.get('/api/v1/college-course/:id/show', [
    AuthToken
], CollegeCourseAPIController.show);

routes.get('/api/v1/college-course/:id/college-course-coordinator', [
    AuthToken
], CollegeCourseAPIController.getCollegeCourseCoordinator);

routes.post('/api/v1/college-course/:id/college-subject/connect', [
    AuthToken,
    CollegeCourseValidator.validate('OnDisAssociateSubject')
], CollegeCourseAPIController.associateCollegeSubject);

routes.put('/api/v1/college-course/:id/college-subject/disconnect', [
    AuthToken,
    CollegeCourseValidator.validate('OnDisAssociateSubject')
], CollegeCourseAPIController.disassociateCollegeSubject);

routes.get('/api/v1/college-course/:id/college-subjects', [
    AuthToken
], CollegeCourseAPIController.getAllCollegeSubject);

routes.get('/api/v1/college-course/:id/students', [
    AuthToken
], CollegeCourseAPIController.getAllStudents);
// =======================FIM ROTAS DE CRUSOS =======================

module.exports = routes;
