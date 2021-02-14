'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('COLLEGE_COURSE', 'coc_fk_college_course_coordinator', {
                    allowNull: false,
                    type: Sequelize.BIGINT,
                    unique: true,
                    references: {
                        model: 'COLLEGE_COURSE_COORDINATOR',
                        key: 'ccc_id_college_course_coordinator',
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    },
                    after: 'coc_id_college_course'
                }, { transaction: t })
            ]);
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('COLLEGE_COURSE', 'coc_fk_college_course_coordinator', { transaction: t })
            ]);
        });
    }
};
