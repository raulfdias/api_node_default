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

// ============================================================================= ROUTES =============================================================================
/**
 * @swagger
 * tags: [
 *  { name: Autenticação, description: Endpoint de autenticação da API },
 *  { name: Estudante, description: Endpoint dos fluxos de estudantes },
 *  { name: Professor, description: Endpoint dos fluxos de professores }
 * ]
 *
 */
/**
 * @swagger
 * components:
 *     securitySchemes:
 *         basicAuth:
 *             type: http
 *             scheme: basic
 *         bearerAuth:
 *             type: http
 *             scheme: bearer
 */
// =======================ROTAS DE TOKEN =======================
/**
 * @swagger
 * /api/v1/token:
 *     post:
 *         summary: Retorna o token de comunicação
 *         tags: [Autenticação]
 *         security:
 *             - basicAuth: []
 *         responses:
 *             200:
 *                 description: O token de comunicação
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 token: =adfnasdfpojnkd9sdns07anf7aawai
 *                                 expiration: 160
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             token: null
 *                             expiration: null
 *                             message: Mensagem
 *                             bagError: {}
 *
 *             401:
 *                 description: Credenciais inválidas
 *                 content:
 *                     application/json:
 *                         example:
 *                             token: null
 *                             expiration: null
 *                             message: Mensagem
 *                             bagError: {}
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             token: null
 *                             expiration: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.post('/api/v1/token', AuthAPIController.generateToken);
// =======================FIM ROTAS DE TOKEN =======================

// =======================ROTAS DE ESTUDANTE =======================
/**
 * @swagger
 * /api/v1/student/list:
 *     get:
 *         summary: Retorna todos os estudantes
 *         tags: [Estudante]
 *         security:
 *             - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Lista de estudantes
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 students: [{},{},{}]
 *                                 message: null
 *                                 bagError: {}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             students: []
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/student/list', [
    AuthToken
], StudentAPIController.list);

/**
 * @swagger
 * /api/v1/student/create:
 *     post:
 *         summary: Cria um novo estudante
 *         tags: [Estudante]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do estudante
 *                              college_semester: 1
 *                              email: email@teste.com
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Estudante criado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 student: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             student: null
 *                             message: Mensagem
 *                             bagError: {name: erro, college_semester: erro, email: erro, status: erro}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             student: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.post('/api/v1/student/create', [
    AuthToken,
    StudentValidator.validate('OnCreate')
], StudentAPIController.store);

/**
 * @swagger
 * /api/v1/student/{id}/update:
 *     put:
 *         summary: Atualiza um estudante já criado
 *         tags: [Estudante]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do estudante
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do estudante
 *                              college_semester: "1"
 *                              email: email@teste.com
 *                              status: "1"
 *         responses:
 *             200:
 *                 description: Estudante atualizado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 student: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             student: null
 *                             message: Mensagem
 *                             bagError: {name: erro, college_semester: erro, email: erro, status: erro}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             student: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.put('/api/v1/student/:id/update', [
    AuthToken,
    StudentValidator.validate('OnUpdate')
], StudentAPIController.update);

/**
 * @swagger
 * /api/v1/student/{id}/delete:
 *     delete:
 *         summary: Remove um estudante já criado
 *         tags: [Estudante]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do estudante
 *         responses:
 *             200:
 *                 description: Estudante removido
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 deleted: true
 *                                 message: null
 *                                 bagError: {}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             deleted: false
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.delete('/api/v1/student/:id/delete', [
    AuthToken
], StudentAPIController.delete);

/**
 * @swagger
 * /api/v1/student/search:
 *     get:
 *         summary: Busca os estudantes a partir do filtro
 *         tags: [Estudante]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do estudante
 *                              college_semester: 1
 *                              email: email@teste.com
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Lista de estudantes filtrados
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 students: [{}, {}, {}]
 *                                 message: null
 *                                 bagError: {}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             students: []
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/student/search', [
    AuthToken
], StudentAPIController.search);

/**
 * @swagger
 * /api/v1/student/{id}/show:
 *     get:
 *         summary: Carrega os dados de um estudante especifico
 *         tags: [Estudante]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do estudante
 *         responses:
 *             200:
 *                 description: Estudante carregado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 student: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             student: {}
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/student/:id/show', [
    AuthToken
], StudentAPIController.show);

/**
 * @swagger
 * /api/v1/student/{id}/college-course/connect:
 *     post:
 *         summary: Conecta o estudante ao curso
 *         tags: [Estudante]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do estudante
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              courses: [{course: id_do_curso, period: periodo_curso}, {course: id_do_curso, period: periodo_curso}]
 *         responses:
 *             200:
 *                 description: Estudante atualizado com a conexão com os cursos
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 student: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             student: null
 *                             message: Mensagem
 *                             bagError: {courses: erro, course: erro, period: erro}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             student: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.post('/api/v1/student/:id/college-course/connect', [
    AuthToken,
    StudentValidator.validate('OnDisAssociateCourse')
], StudentAPIController.associateCollegeCurses);

/**
 * @swagger
 * /api/v1/student/{id}/college-course/disconnect:
 *     put:
 *         summary: Desconecta o estudante ao curso
 *         tags: [Estudante]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do estudante
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              courses: [id_do_curso, id_do_curso]
 *         responses:
 *             200:
 *                 description: Estudante atualizado com a desassociação dos cursos
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 student: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             student: null
 *                             message: Mensagem
 *                             bagError: {courses: erro}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             student: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.put('/api/v1/student/:id/college-course/disconnect', [
    AuthToken,
    StudentValidator.validate('OnDisAssociateCourse')
], StudentAPIController.disassociateCollegeCurses);

/**
 * @swagger
 * /api/v1/student/{id}/college-course:
 *     get:
 *         summary: Retorna os cursos que o estudante está matriculado
 *         tags: [Estudante]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do estudante
 *         responses:
 *             200:
 *                 description: Estudante atualizado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourses: [{}]
 *                                 message: null
 *                                 bagError: {}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             collegeCourses: []
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/student/:id/college-course', [
    AuthToken
], StudentAPIController.getAllCollegeCourse);
// =======================FIM ROTAS DE ESTUDANTE =======================

// =======================ROTAS DE PROFESSOR =======================
/**
 * @swagger
 * /api/v1/teacher/list:
 *     get:
 *         summary: Retorna todos os professores
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Lista de professores
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 teachers: [{},{},{}]
 *                                 message: null
 *                                 bagError: {}
 *
 *             401:
 *                 description: Token inválido
 *                 content:
 *                     application/json:
 *                         example:
 *                             message: Mensagem
 *
 *             500:
 *                 description: Erro interno do servidor
 *                 content:
 *                     application/json:
 *                         example:
 *                             teachers: []
 *                             message: Mensagem
 *                             bagError: {}
 */
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
