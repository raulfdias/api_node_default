'use strict';

class TeacherEnum {
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
        value = String(value);

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

module.exports = new TeacherEnum();
