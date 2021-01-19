'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ALUNO', {
      alu_id_aluno: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
        unique: true
      },
      alu_ds_nome: {
        allowNull: false,
        type: Sequelize.STRING(125)
      },
      alu_ds_email: {
        allowNull: false,
        type: Sequelize.STRING(125),
        unique: true
      },
      alu_ds_semestre: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        defaultValue: '1'
      },
      alu_ds_status: {
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
    return queryInterface.dropTable('ALUNO');
  }
};
