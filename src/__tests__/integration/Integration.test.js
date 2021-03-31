const AuthApiTest = require('./controllers/AuthApi'),
    StudentApiTest = require('./controllers/StudentApi'),
    CollegeSubjectApiTest = require('./controllers/CollegeSubjectApi'),
    CollegeCourseApiTest = require('./controllers/CollegeCourseApi'),
    CollegeCourseCoordinatorApiTest = require('./controllers/CollegeCourseCoordinatorApi'),
    TeacherApiTest = require('./controllers/TeacherApi');

describe('Integration Tests', () => {
    AuthApiTest();
    StudentApiTest();
    TeacherApiTest();
    CollegeSubjectApiTest();
    CollegeCourseApiTest();
    CollegeCourseCoordinatorApiTest();
});
