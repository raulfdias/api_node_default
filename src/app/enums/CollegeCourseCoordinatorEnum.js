'use strict';

class CollegeCourseCoordinatorEnum {
    constructor() {
        // STATUS
        this.ACTIVE = {
            'val': '1',
            'txt': 'ATIVO'
        };
        this.INACTIVE = {
            'val': '2',
            'txt': 'INATIVO'
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
}

module.exports = new CollegeCourseCoordinatorEnum();
