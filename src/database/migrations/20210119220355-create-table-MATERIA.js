'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MATERIA', {
      mat_id_materia: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
        unique: true
      },
      mat_ds_nome: {
        allowNull: false,
        type: Sequelize.STRING(125)
      },
      mat_ds_status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['0', '1'],
        defaultValue: '1'
      },
      created_at:{
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updated_at:{
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MATERIA');
  }
};
