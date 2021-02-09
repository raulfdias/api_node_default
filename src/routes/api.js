const express = require('express'),
    routes = express.Router();

// Controllers
const StudentAPIController = require('../app/controllers/API/StudentAPIController');
const TeacherAPIController = require('../app/controllers/API/TeacherAPIController');
const CollegeCourseCoordinatorAPIController = require('../app/controllers/API/CollegeCourseCoordinatorAPIController');

// Middleware
const StudentValidator = require('../app/middleware/RequestValidation/Student');
const TeacherValidator = require('../app/middleware/RequestValidation/Teacher');
const CollegeCourseCoordinator = require('../app/middleware/RequestValidation/CollegeCourseCoordinator');

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

module.exports = routes;
