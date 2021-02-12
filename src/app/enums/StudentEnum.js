'use strict';

class StudentEnum {
    constructor() {
        // STATUS
        this.ACTIVE = {
            'val': '1',
            'txt': 'ACTIVE'
        };
        this.INACTIVE = {
            'val': '0',
            'txt': 'INACTIVE'
        };

        // SEMESTRES
        this.FIRST_SEMESTER = {
            'val': '1',
            'txt': 'PRIMEIRO SEMESTRE'
        };
        this.SECOND_SEMESTER = {
            'val': '2',
            'txt': 'SEGUNDO SEMESTRE'
        };
        this.THIRD_SEMESTER = {
            'val': '3',
            'txt': 'TERCEIRO SEMESTRE'
        };
        this.FOURTH_SEMESTER = {
            'val': '4',
            'txt': 'QUARTO SEMESTRE'
        };
        this.FIFTH_SEMESTER = {
            'val': '5',
            'txt': 'QUINTO SEMESTRE'
        };
        this.SIXTH_SEMESTER = {
            'val': '6',
            'txt': 'SEXTO SEMESTRE'
        };
        this.SEVENTH_SEMESTER = {
            'val': '7',
            'txt': 'SÉTIMO SEMESTRE'
        };
        this.EIGHTH_SEMESTER = {
            'val': '8',
            'txt': 'OITAVO SEMESTRE'
        };
        this.NINTH_SEMESTER = {
            'val': '9',
            'txt': 'NONO SEMESTRE'
        };
        this.TENTH_SEMESTER = {
            'val': '10',
            'txt': 'DÉCIMO SEMESTRE'
        };
    }

    /**
     * Carrega a lista de todos os enums
     *
     * @param {*} type
     * @returns array
     */
    listEnumerators(type) {
        switch (type) {
            case 'STATUS':
                return [
                    this.ACTIVE.val,
                    this.INACTIVE.val
                ];

            case 'COLLEGE_SEMESTER':
                return [
                    this.FIRST_SEMESTER.val,
                    this.SECOND_SEMESTER.val,
                    this.THIRD_SEMESTER.val,
                    this.FOURTH_SEMESTER.val,
                    this.FIFTH_SEMESTER.val,
                    this.SIXTH_SEMESTER.val,
                    this.SEVENTH_SEMESTER.val,
                    this.EIGHTH_SEMESTER.val,
                    this.NINTH_SEMESTER.val,
                    this.TENTH_SEMESTER.val
                ];

            default:
                return [];
        }
    }

    /**
     * Função responsável por normalizar os status do usuário
     *
     * @param {*} value
     * @param {*} flag
     * @returns string
     */
    normalizeStatus(value, flag = 'val') {
        switch (value) {
            case this.ACTIVE.val:
                return this.ACTIVE[flag];

            case this.INACTIVE.val:
                return this.INACTIVE[flag];

            default:
                return this.INACTIVE[flag];
        }
    }

    /**
     * Função responsável por normalizar os status do usuário
     *
     * @param {*} value
     * @param {*} flag
     * @returns string
     */
    normalizeCollegeSemester(value, flag = 'val') {
        switch (value) {
            case this.FIRST_SEMESTER.val:
                return this.FIRST_SEMESTER[flag];

            case this.SECOND_SEMESTER.val:
                return this.SECOND_SEMESTER[flag];

            case this.THIRD_SEMESTER.val:
                return this.THIRD_SEMESTER[flag];

            case this.FOURTH_SEMESTER.val:
                return this.FOURTH_SEMESTER[flag];

            case this.FIFTH_SEMESTER.val:
                return this.FIFTH_SEMESTER[flag];

            case this.SIXTH_SEMESTER.val:
                return this.SIXTH_SEMESTER[flag];

            case this.SEVENTH_SEMESTER.val:
                return this.SEVENTH_SEMESTER[flag];

            case this.EIGHTH_SEMESTER.val:
                return this.EIGHTH_SEMESTER[flag];

            case this.NINTH_SEMESTER.val:
                return this.NINTH_SEMESTER[flag];

            case this.TENTH_SEMESTER.val:
                return this.TENTH_SEMESTER[flag];

            default:
                return this.FIRST_SEMESTER[flag];
        }
    }
}

module.exports = new StudentEnum();
