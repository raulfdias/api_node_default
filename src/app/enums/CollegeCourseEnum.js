'use strict';

class CollegeCourseEnum {
    constructor() {
        // Status
        this.ACTIVE = '1';
        this.INACTIVE = '0';
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

            default:
                return [];
        }
    }

    /**
     * Função responsável por normalizar os status
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
}

module.exports = new CollegeCourseEnum();
