'use strict';

class StudentEnum {
    constructor() {
        // Status
        this.ACTIVE = '1';
        this.INACTIVE = '0';

        // College Semester
        this.FIRST_SEMESTER = '1';
        this.SECOND_SEMESTER = '2';
        this.THIRD_SEMESTER = '3';
        this.FOURTH_SEMESTER = '4';
        this.FIFTH_SEMESTER = '5';
        this.SIXTH_SEMESTER = '6';
        this.SEVENTH_SEMESTER = '7';
        this.EIGHTH_SEMESTER = '8';
        this.NINTH_SEMESTER = '9';
        this.TENTH_SEMESTER = '10';
    }

    /**
     * Carrega a lista de todos os enums
     *
     * @param {*} type
     * @returns array
     */
    listEnumarators(type) {
        switch (type) {
            case 'STATUS':
                return [
                    this.ACTIVE,
                    this.INACTIVE
                ];

            case 'COLLEGE_SEMESTER':
                return [
                    this.FIRST_SEMESTER,
                    this.SECOND_SEMESTERFIRST_SEMESTER,
                    this.THIRD_SEMESTERFIRST_SEMESTER,
                    this.FOURTH_SEMESTERFIRST_SEMESTER,
                    this.FIFTH_SEMESTERFIRST_SEMESTER,
                    this.SIXTH_SEMESTERFIRST_SEMESTER,
                    this.SEVENTH_SEMESTERFIRST_SEMESTER,
                    this.EIGHTH_SEMESTERFIRST_SEMESTER,
                    this.NINTH_SEMESTERFIRST_SEMESTER,
                    this.TENTH_SEMESTERFIRST_SEMESTER
                ];

            default:
                return [];
        }
    }

    /**
     * Função responsável por normalizar os status do usuário
     *
     * @param {*} value
     * @returns string
     */
    normalizeStatus(value) {
        switch (value) {
            case this.ACTIVE:
                return this.ACTIVE;

            case this.INACTIVE:
                return this.INACTIVE;

            default:
                return this.INACTIVE;
        }
    }

    /**
     * Função responsável por normalizar os status do usuário
     *
     * @param {*} value
     * @returns string
     */
    normalizeCollegeSemester(value) {
        switch (value) {
            case this.FIRST_SEMESTER:
                return this.FIRST_SEMESTER;

            case this.SECOND_SEMESTER:
                return this.SECOND_SEMESTER;

            case this.THIRD_SEMESTER:
                return this.THIRD_SEMESTER;

            case this.FOURTH_SEMESTER:
                return this.FOURTH_SEMESTER;

            case this.FIFTH_SEMESTER:
                return this.FIFTH_SEMESTER;

            case this.SIXTH_SEMESTER:
                return this.SIXTH_SEMESTER;

            case this.SEVENTH_SEMESTER:
                return this.SEVENTH_SEMESTER;

            case this.EIGHTH_SEMESTER:
                return this.EIGHTH_SEMESTER;

            case this.NINTH_SEMESTER:
                return this.NINTH_SEMESTER;

            case this.TENTH_SEMESTER:
                return this.TENTH_SEMESTER;

            default:
                return this.FIRST_SEMESTER;
        }
    }
}

module.exports = new StudentEnum();
