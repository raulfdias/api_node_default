const AuthApiTest = require('./controllers/AuthApi'),
    StudentApiTest = require('./controllers/StudentApi');

describe('Integration Tests', () => {
    AuthApiTest();
    StudentApiTest();
});
