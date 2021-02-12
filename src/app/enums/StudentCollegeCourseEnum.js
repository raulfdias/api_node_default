'use strict';

class StudentCollegeCourseEnum {
    constructor() {
        // PERÍODO
        this.MORNING = {
            'val': '1',
            'txt': 'MATUTINO'
        };
        this.EVENING = {
            'val': '2',
            'txt': 'VESPERTINO'
        };
        this.NIGHT = {
            'val': '3',
            'txt': 'NOTURNO'
        };
    }

    /**
     * Carrega a lista de todos os enums
     *
     * @param {*} type
     * @returns array
     */
    listEnumarators(type) {
        switch (type) {
            case 'PERIOD':
                return [
                    this.MORNING.val,
                    this.EVENING.val,
                    this.NIGHT.val
                ];

            default:
                return [];
        }
    }

    /**
     * Função responsável por normalizar os período
     *
     * @param {*} value
     * @param {*} flag
     * @returns string
     */
    normalizePeriod(value, flag = 'val') {
        switch (value) {
            case this.MORNING.val:
                return this.MORNING[flag];

            case this.EVENING.val:
                return this.EVENING[flag];

            case this.NIGHT.val:
                return this.NIGHT[flag];

            default:
                return this.MORNING[flag];
        }
    }
}

module.exports = new StudentCollegeCourseEnum();
