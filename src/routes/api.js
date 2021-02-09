const express = require('express'),
    routes = express.Router();

// Controllers
const StudentAPIController = require('../app/controllers/API/StudentAPIController');
const TeacherAPIController = require('../app/controllers/API/TeacherAPIController');
const CollegeCourseCoordinatorAPIController = require('../app/controllers/API/CollegeCourseCoordinatorAPIController');
const CollegeSubjectAPIController = require('../app/controllers/API/CollegeSubjectAPIController');
const CollegeCourseAPIController = require('../app/controllers/API/CollegeCourseAPIController');

// Middleware
const StudentValidator = require('../app/middleware/RequestValidation/Student');
const TeacherValidator = require('../app/middleware/RequestValidation/Teacher');
const CollegeCourseCoordinator = require('../app/middleware/RequestValidation/CollegeCourseCoordinator');
const CollegeSubject = require('../app/middleware/RequestValidation/CollegeSubject');
const CollegeCourse = require('../app/middleware/RequestValidation/CollegeCourse');

// Routes
routes.get('/api/v1/student/list', StudentAPIController.list);
routes.post('/api/v1/student/create', StudentValidator.validate('OnCreate'), StudentAPIController.store);
routes.put('/api/v1/student/:id/update', StudentValidator.validate('OnUpdate'), StudentAPIController.update);
routes.delete('/api/v1/student/:id/delete', StudentAPIController.delete);
routes.get('/api/v1/student/search', StudentAPIController.search);
routes.get('/api/v1/student/:id/show', StudentAPIController.show);

routes.get('/api/v1/teacher/list', TeacherAPIController.list);
routes.post('/api/v1/teacher/create', TeacherValidator.validate('OnCreate'), TeacherAPIController.store);
routes.put('/api/v1/teacher/:id/update', TeacherValidator.validate('OnUpdate'), TeacherAPIController.update);
routes.delete('/api/v1/teacher/:id/delete', TeacherAPIController.delete);
routes.get('/api/v1/teacher/search', TeacherAPIController.search);
routes.get('/api/v1/teacher/:id/show', TeacherAPIController.show);

routes.get('/api/v1/college-course-coordinator/list', CollegeCourseCoordinatorAPIController.list);
routes.post('/api/v1/college-course-coordinator/create', CollegeCourseCoordinator.validate('OnCreate'), CollegeCourseCoordinatorAPIController.store);
routes.put('/api/v1/college-course-coordinator/:id/update', CollegeCourseCoordinator.validate('OnUpdate'), CollegeCourseCoordinatorAPIController.update);
routes.delete('/api/v1/college-course-coordinator/:id/delete', CollegeCourseCoordinatorAPIController.delete);
routes.get('/api/v1/college-course-coordinator/search', CollegeCourseCoordinatorAPIController.search);
routes.get('/api/v1/college-course-coordinator/:id/show', CollegeCourseCoordinatorAPIController.show);

routes.get('/api/v1/college-subject/list', CollegeSubjectAPIController.list);
routes.post('/api/v1/college-subject/create', CollegeSubject.validate('OnCreate'), CollegeSubjectAPIController.store);
routes.put('/api/v1/college-subject/:id/update', CollegeSubject.validate('OnUpdate'), CollegeSubjectAPIController.update);
routes.delete('/api/v1/college-subject/:id/delete', CollegeSubjectAPIController.delete);
routes.get('/api/v1/college-subject/search', CollegeSubjectAPIController.search);
routes.get('/api/v1/college-subject/:id/show', CollegeSubjectAPIController.show);

routes.get('/api/v1/college-course/list', CollegeCourseAPIController.list);
routes.post('/api/v1/college-course/create', CollegeCourse.validate('OnCreate'), CollegeCourseAPIController.store);
routes.put('/api/v1/college-course/:id/update', CollegeCourse.validate('OnUpdate'), CollegeCourseAPIController.update);
routes.delete('/api/v1/college-course/:id/delete', CollegeCourseAPIController.delete);
routes.get('/api/v1/college-course/search', CollegeCourseAPIController.search);
routes.get('/api/v1/college-course/:id/show', CollegeCourseAPIController.show);

module.exports = routes;
