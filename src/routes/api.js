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
 *  { name: Professor, description: Endpoint dos fluxos de professores },
 *  { name: Coordenador de curso, description: Endpoint dos fluxos de coordenadores },
 *  { name: Matéria, description: Endpoint dos fluxos de matérias },
 *  { name: Curso, description: Endpoint dos fluxos de cursos },
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
 *                                 students: [{}, {}]
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
 *                              college_semester: 1
 *                              email: email@teste.com
 *                              status: 1
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
 *                                 students: [{}, {}]
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
 *                 description: Estudante com a associação com os cursos
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
 *                 description: Estudante com a desassociação dos cursos
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
 *                 description: Cursos associados ao estudante
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourses: [{}, {}]
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
 *                                 teachers: [{}, {}]
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

/**
 * @swagger
 * /api/v1/teacher/create:
 *     post:
 *         summary: Cria um novo professor
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do professor
 *                              email: email@teste.com
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Professor criado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 teacher: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             teacher: null
 *                             message: Mensagem
 *                             bagError: {name: erro, email: erro, status: erro}
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
 *                             teacher: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.post('/api/v1/teacher/create', [
    AuthToken,
    TeacherValidator.validate('OnCreate')
], TeacherAPIController.store);

/**
 * @swagger
 * /api/v1/teacher/{id}/update:
 *     put:
 *         summary: Atualiza um professor já criado
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do professor
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do professor
 *                              email: email@teste.com
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Professor atualizado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 teacher: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             teacher: null
 *                             message: Mensagem
 *                             bagError: {name: erro, email: erro, status: erro}
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
 *                             teacher: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.put('/api/v1/teacher/:id/update', [
    AuthToken,
    TeacherValidator.validate('OnUpdate')
], TeacherAPIController.update);

/**
 * @swagger
 * /api/v1/teacher/{id}/delete:
 *     delete:
 *         summary: Remove um professor já criado
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do professor
 *         responses:
 *             200:
 *                 description: Professor removido
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
routes.delete('/api/v1/teacher/:id/delete', [
    AuthToken
], TeacherAPIController.delete);

/**
 * @swagger
 * /api/v1/teacher/search:
 *     get:
 *         summary: Busca os professores a partir do filtro
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do professor
 *                              email: email@teste.com
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Lista de professores filtrados
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 teachers: [{}, {}]
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
routes.get('/api/v1/teacher/search', [
    AuthToken
], TeacherAPIController.search);

/**
 * @swagger
 * /api/v1/teacher/{id}/show:
 *     get:
 *         summary: Carrega os dados de um professor especifico
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do professor
 *         responses:
 *             200:
 *                 description: Professor carregado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 teacher: {}
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
 *                             teacher: {}
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/teacher/:id/show', [
    AuthToken
], TeacherAPIController.show);

/**
 * @swagger
 * /api/v1/teacher/{id}/college-subjects/connect:
 *     post:
 *         summary: Conecta o professor à matéria
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do professor
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              subjects: [id_da_materia, id_da_materia]
 *         responses:
 *             200:
 *                 description: Professor com a associação das matérias informadas
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 teacher: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             teacher: null
 *                             message: Mensagem
 *                             bagError: {subjects: erro}
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
 *                             teacher: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.post('/api/v1/teacher/:id/college-subjects/connect', [
    AuthToken,
    TeacherValidator.validate('OnDisAssociateSubject')
], TeacherAPIController.associateCollegeSubject);

/**
 * @swagger
 * /api/v1/teacher/{id}/college-subjects/disconnect:
 *     put:
 *         summary: Desconecta o professor ao curso
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do professor
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              subjects: [id_da_materia, id_da_materia]
 *         responses:
 *             200:
 *                 description: Professor com a desassociação das matérias informadas
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 teacher: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             teacher: null
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
 *                             teacher: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.put('/api/v1/teacher/:id/college-subjects/disconnect', [
    AuthToken,
    TeacherValidator.validate('OnDisAssociateSubject')
], TeacherAPIController.disassociateCollegeSubject);

/**
 * @swagger
 * /api/v1/teacher/{id}/college-subjects:
 *     get:
 *         summary: Retorna as matérias que estão associadas ao professor
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do professor
 *         responses:
 *             200:
 *                 description: Matérias associadas ao professor
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeSubjects: [{}, {}]
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
 *                             collegeSubjects: []
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/teacher/:id/college-subjects', [
    AuthToken
], TeacherAPIController.getAllCollegeSubject);

// =======================FIM ROTAS DE PROFESSOR =======================

// =======================ROTAS DE COORDENADOR DE CURSO =======================

/**
 * @swagger
 * /api/v1/college-course-coordinator/list:
 *     get:
 *         summary: Retorna todos os coordenadores
 *         tags: [Professor]
 *         security:
 *             - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Lista de coordenadores
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourseCoordinators: [{}, {}]
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
 *                             collegeCourseCoordinators: []
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-course-coordinator/list', [
    AuthToken
], CollegeCourseCoordinatorAPIController.list);

/**
 * @swagger
 * /api/v1/college-course-coordinator/create:
 *     post:
 *         summary: Cria um novo coordenador
 *         tags: [Coordenador de curso]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do coordenador
 *                              email: email@teste.com
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Coordenador criado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourseCoordinator: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             collegeCourseCoordinator: null
 *                             message: Mensagem
 *                             bagError: {name: erro, email: erro, status: erro}
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
 *                             collegeCourseCoordinator: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.post('/api/v1/college-course-coordinator/create', [
    AuthToken,
    CollegeCourseCoordinatorValidator.validate('OnCreate')
], CollegeCourseCoordinatorAPIController.store);

/**
 * @swagger
 * /api/v1/college-course-coordinator/{id}/update:
 *     put:
 *         summary: Atualiza um coordenador já criado
 *         tags: [Coordenador de curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do coordenador
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do coordenador
 *                              email: email@teste.com
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Coordenador atualizado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourseCoordinator: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             collegeCourseCoordinator: null
 *                             message: Mensagem
 *                             bagError: {name: erro, email: erro, status: erro}
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
 *                             collegeCourseCoordinator: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.put('/api/v1/college-course-coordinator/:id/update', [
    AuthToken,
    CollegeCourseCoordinatorValidator.validate('OnUpdate')
], CollegeCourseCoordinatorAPIController.update);

/**
 * @swagger
 * /api/v1/college-course-coordinator/{id}/delete:
 *     delete:
 *         summary: Remove um coordenador já criado
 *         tags: [Coordenador de curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do coordenador
 *         responses:
 *             200:
 *                 description: Coordenador removido
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
routes.delete('/api/v1/college-course-coordinator/:id/delete', [
    AuthToken
], CollegeCourseCoordinatorAPIController.delete);

/**
 * @swagger
 * /api/v1/college-course-coordinator/search:
 *     get:
 *         summary: Busca os coordenadores a partir do filtro
 *         tags: [Coordenador de curso]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do coordenador
 *                              email: email@teste.com
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Lista de coordenadores filtrados
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourseCoordinators: [{}, {}]
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
 *                             collegeCourseCoordinators: []
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-course-coordinator/search', [
    AuthToken
], CollegeCourseCoordinatorAPIController.search);

/**
 * @swagger
 * /api/v1/college-course-coordinator/{id}/show:
 *     get:
 *         summary: Carrega os dados de um coordenador especifico
 *         tags: [Coordenador de curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do coordenador
 *         responses:
 *             200:
 *                 description: Coordenador carregado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourseCoordinator: {}
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
 *                             collegeCourseCoordinator: {}
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-course-coordinator/:id/show', [
    AuthToken
], CollegeCourseCoordinatorAPIController.show);

/**
 * @swagger
 * /api/v1/college-course-coordinator/{id}/college-course:
 *     get:
 *         summary: Retorna os cursos que o coordenador está matriculado
 *         tags: [Coordenador de curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do coordenador
 *         responses:
 *             200:
 *                 description: Lista de cursos
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourse: {}
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
 *                             collegeCourse: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-course-coordinator/:id/college-courses', [
    AuthToken
], CollegeCourseCoordinatorAPIController.getCollegeCourseFromCoordinator);

// =======================FIM ROTAS DE COORDENADOR DE CURSO =======================

// =======================ROTAS DE MATÉRIAS DE CURSO =======================

/**
 * @swagger
 * /api/v1/college-subject/list:
 *     get:
 *         summary: Retorna todas as matérias
 *         tags: [Matéria]
 *         security:
 *             - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Lista de matérias
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeSubjects: [{}, {}]
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
 *                             collegeSubjects: []
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-subject/list', [
    AuthToken
], CollegeSubjectAPIController.list);

/**
 * @swagger
 * /api/v1/college-subject/create:
 *     post:
 *         summary: Cria uma nova matéria
 *         tags: [Matéria]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome da matéria
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Matéria criada
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeSubject: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             collegeSubject: null
 *                             message: Mensagem
 *                             bagError: {name: erro, status: erro}
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
 *                             collegeSubject: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.post('/api/v1/college-subject/create', [
    AuthToken,
    CollegeSubjectValidator.validate('OnCreate')
], CollegeSubjectAPIController.store);

/**
 * @swagger
 * /api/v1/college-subject/{id}/update:
 *     put:
 *         summary: Atualiza uma matéria já criada
 *         tags: [Matéria]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID da matéria
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome da matéria
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Matéria atualizada
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeSubject: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             collegeSubject: null
 *                             message: Mensagem
 *                             bagError: {name: erro, status: erro}
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
 *                             collegeSubject: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.put('/api/v1/college-subject/:id/update', [
    AuthToken,
    CollegeSubjectValidator.validate('OnUpdate')
], CollegeSubjectAPIController.update);

/**
 * @swagger
 * /api/v1/college-subject/{id}/delete:
 *     delete:
 *         summary: Remove uma matéria já criada
 *         tags: [Matéria]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID da matéria
 *         responses:
 *             200:
 *                 description: Matéria removida
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
routes.delete('/api/v1/college-subject/:id/delete', [
    AuthToken
], CollegeSubjectAPIController.delete);

/**
 * @swagger
 * /api/v1/college-subject/search:
 *     get:
 *         summary: Busca as matérias a partir do filtro
 *         tags: [Matéria]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome da matéria
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Lista de matérias filtradas
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeSubjects: [{}, {}]
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
 *                             collegeSubjects: []
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-subject/search', [
    AuthToken
], CollegeSubjectAPIController.search);

/**
 * @swagger
 * /api/v1/college-subject/{id}/show:
 *     get:
 *         summary: Carrega os dados de uma matéria especifica
 *         tags: [Matéria]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID da matéria
 *         responses:
 *             200:
 *                 description: Matéria carregada
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeSubject: {}
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
 *                             collegeSubject: {}
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-subject/:id/show', [
    AuthToken
], CollegeSubjectAPIController.show);

/**
 * @swagger
 * /api/v1/college-subject/{id}/teachers:
 *     get:
 *         summary: Retorna os professores que estão associados matéria
 *         tags: [Matéria]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID da matéria
 *         responses:
 *             200:
 *                 description: Matéria atualizada
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 teachers: [{}, {}]
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
routes.get('/api/v1/college-subject/:id/teachers', [
    AuthToken
], CollegeSubjectAPIController.getAllTeacher);

// =======================FIM ROTAS DE MATÉRIAS DE CURSO =======================

// =======================ROTAS DE CRUSOS =======================

/**
  * @swagger
  * /api/v1/college-course/list:
  *     get:
  *         summary: Retorna todos os cursos
  *         tags: [Curso]
  *         security:
  *             - bearerAuth: []
  *         responses:
  *             200:
  *                 description: Lista de cursos
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: object
  *                             example:
  *                                 collegeCourses: [{}, {}]
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
routes.get('/api/v1/college-course/list', [
    AuthToken
], CollegeCourseAPIController.list);

/**
 * @swagger
 * /api/v1/college-course/create:
 *     post:
 *         summary: Cria um novo curso
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do curso
 *                              college_course_coordinator: 1
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Curso criado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourse: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             collegeCourse: null
 *                             message: Mensagem
 *                             bagError: {name: erro, college_course_coordinator: erro, status: erro}
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
 *                             collegeCourse: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.post('/api/v1/college-course/create', [
    AuthToken,
    CollegeCourseValidator.validate('OnCreate')
], CollegeCourseAPIController.store);

/**
 * @swagger
 * /api/v1/college-course/{id}/update:
 *     put:
 *         summary: Atualiza um curso já criado
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do curso
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do curso
 *                              college_course_coordinator: 1
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Curso atualizado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourse: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             collegeCourse: null
 *                             message: Mensagem
 *                             bagError: {name: erro, college_course_coordinator: erro, status: erro}
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
 *                             collegeCourse: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.put('/api/v1/college-course/:id/update', [
    AuthToken,
    CollegeCourseValidator.validate('OnUpdate')
], CollegeCourseAPIController.update);

/**
 * @swagger
 * /api/v1/college-course/{id}/delete:
 *     delete:
 *         summary: Remove um curso já criado
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do curso
 *         responses:
 *             200:
 *                 description: Curso removido
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
routes.delete('/api/v1/college-course/:id/delete', [
    AuthToken
], CollegeCourseAPIController.delete);

/**
 * @swagger
 * /api/v1/college-course/search:
 *     get:
 *         summary: Busca os cursos a partir do filtro
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              name: Nome do curso
 *                              status: 1
 *         responses:
 *             200:
 *                 description: Lista de cursos filtrados
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourses: [{}, {}]
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
routes.get('/api/v1/college-course/search', [
    AuthToken
], CollegeCourseAPIController.search);

/**
 * @swagger
 * /api/v1/college-course/{id}/show:
 *     get:
 *         summary: Carrega os dados de um curso especifico
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do curso
 *         responses:
 *             200:
 *                 description: Curso carregado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourse: {}
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
 *                             collegeCourse: {}
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-course/:id/show', [
    AuthToken
], CollegeCourseAPIController.show);

/**
 * @swagger
 * /api/v1/college-course/{id}/college-subject/connect:
 *     post:
 *         summary: Conecta as matérias ao curso
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do curso
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              subjects: [id_da_materia, id_da_materia]
 *         responses:
 *             200:
 *                 description: Curso com a associação com as matérias
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourse: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             collegeCourse: null
 *                             message: Mensagem
 *                             bagError: {subjects: erro}
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
 *                             collegeCourse: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.post('/api/v1/college-course/:id/college-subject/connect', [
    AuthToken,
    CollegeCourseValidator.validate('OnDisAssociateSubject')
], CollegeCourseAPIController.associateCollegeSubject);

/**
 * @swagger
 * /api/v1/college-course/{id}/college-subject/disconnect:
 *     put:
 *         summary: Desconecta as matérias ao curso
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do curso
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              courses: [id_da_materia, id_da_materia]
 *         responses:
 *             200:
 *                 description: Estudante com a desassociação dos cursos
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourse: {}
 *                                 message: null
 *                                 bagError: {}
 *
 *             400:
 *                 description: Dados inválidos
 *                 content:
 *                     application/json:
 *                         example:
 *                             collegeCourse: null
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
 *                             collegeCourse: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.put('/api/v1/college-course/:id/college-subject/disconnect', [
    AuthToken,
    CollegeCourseValidator.validate('OnDisAssociateSubject')
], CollegeCourseAPIController.disassociateCollegeSubject);

/**
 * @swagger
 * /api/v1/college-course/{id}/college-subjects:
 *     get:
 *         summary: Retorna as matérias em associação com o curso
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do curso
 *         responses:
 *             200:
 *                 description: Matérias em associação com o curso
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeSubjects: [{}, {}]
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
 *                             collegeSubjects: []
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-course/:id/college-subjects', [
    AuthToken
], CollegeCourseAPIController.getAllCollegeSubject);

/**
 * @swagger
 * /api/v1/college-course/{id}/students:
 *     get:
 *         summary: Retorna os estudantes em associação com o curso
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do curso
 *         responses:
 *             200:
 *                 description: Estudantes em associação com o curso
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 students: [{}, {}]
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
routes.get('/api/v1/college-course/:id/students', [
    AuthToken
], CollegeCourseAPIController.getAllStudents);

/**
 * @swagger
 * /api/v1/college-course/{id}/college-course-coordinator:
 *     get:
 *         summary: Retorna o coordenador em associação com o curso
 *         tags: [Curso]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: string
 *               required: true
 *               description: ID do curso
 *         responses:
 *             200:
 *                 description: Coordenador em associação com o curso
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             example:
 *                                 collegeCourseCoordinator: {}
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
 *                             collegeCourseCoordinator: null
 *                             message: Mensagem
 *                             bagError: {}
 */
routes.get('/api/v1/college-course/:id/college-course-coordinator', [
    AuthToken
], CollegeCourseAPIController.getCollegeCourseCoordinator);

// =======================FIM ROTAS DE CRUSOS =======================

// ============================================================================= FIM ROUTES =============================================================================

module.exports = routes;
