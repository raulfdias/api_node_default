const bcrypt = require('bcryptjs');

const { User, Student, CollegeCourseCoordinator, CollegeCourse, CollegeSubject, Teacher } = require('../../app/models');

async function createApiUser(pass) {
    const hash = await bcrypt.hash(pass, 10);
    const data = {
        usu_ds_name: '[DEV] Raul Fernandes [[Test Mass]]',
        usu_ds_email: 'raul.fernandes@test.mass.com',
        usu_ds_password: hash,
        usu_en_status: '1'
    };

    return await User.create(data);
};

async function createStudent() {
    const data = [
        {
            stu_en_college_semester: '1',
            stu_en_status: '1',
            stu_ds_email: 'aluno01@test.mass.com',
            stu_ds_name: 'Aluno de Teste 01 [[Test Mass]]'
        },
        {
            stu_en_college_semester: '1',
            stu_en_status: '1',
            stu_ds_email: 'aluno02@test.mass.com',
            stu_ds_name: 'Aluno de Teste 02 [[Test Mass]]'
        }
    ];

    return await Student.bulkCreate(data);
};

async function createCollegeCourseCoordinator() {
    const data = [
        {
            ccc_en_status: '1',
            ccc_ds_email: 'coordenador01@test.mass.com',
            ccc_ds_name: 'Coordenador de Teste 01 [[Test Mass]]'
        },
        {
            ccc_en_status: '1',
            ccc_ds_email: 'coordenador02@test.mass.com',
            ccc_ds_name: 'Coordenador de Teste 02 [[Test Mass]]'
        }
    ];

    return await CollegeCourseCoordinator.bulkCreate(data);
};

async function createCollegeCourse() {
    const data = [
        {
            coc_fk_college_course_coordinator: null,
            coc_en_status: '1',
            coc_ds_name: 'Curso de Teste 01 [[Test Mass]]'
        },
        {
            coc_fk_college_course_coordinator: null,
            coc_en_status: '1',
            coc_ds_name: 'Curso de Teste 02 [[Test Mass]]'
        }
    ];

    return await CollegeCourse.bulkCreate(data);
};

async function createCollegeSubject() {
    const data = [
        {
            cos_en_status: '1',
            cos_ds_name: 'Matéria de Teste 01 [[Test Mass]]'
        },
        {
            cos_en_status: '1',
            cos_ds_name: 'Matéria de Teste 02 [[Test Mass]]'
        }
    ];

    return await CollegeSubject.bulkCreate(data);
};

async function createTeacher() {
    const data = [
        {
            tea_en_status: '1',
            tea_ds_email: 'Professor de Teste 01 [[Test Mass]]',
            tea_ds_name: 'professor01@teste.com'
        },
        {
            tea_en_status: '1',
            tea_ds_email: 'Professor de Teste 02 [[Test Mass]]',
            tea_ds_name: 'professor02@teste.com'
        }
    ];

    return await Teacher.bulkCreate(data);
};

exports.createTestMass = async (testName) => {
    const userPassword = '1234567890';

    switch (testName) {
        case 'AuthApi': {
            return {
                user: await createApiUser(userPassword),
                userPassword
            };
        }
        case 'StudentApi': {
            return {
                user: await createApiUser(userPassword),
                collegeCourses: await createCollegeCourse(),
                userPassword
            };
        }
        case 'TeacherApi': {
            return {
                user: await createApiUser(userPassword),
                collegeSubjects: await createCollegeSubject(),
                userPassword
            };
        }
        case 'CollegeSubjectApi': {
            return {
                user: await createApiUser(userPassword),
                teachers: await createTeacher(),
                userPassword
            };
        }
        case 'CollegeCourseApi': {
            return {
                user: await createApiUser(userPassword),
                collegeCourseCoordinators: await createCollegeCourseCoordinator(),
                collegeSubjects: await createCollegeSubject(),
                students: await createStudent(),
                userPassword
            };
        }
        case 'CollegeCourseCoordinatorApi': {
            return {
                user: await createApiUser(userPassword),
                collegeCourses: await createCollegeCourse(),
                userPassword
            };
        }
        default: {
            return {};
        }
    }
};
