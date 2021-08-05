'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Session','createdAt','created_at' );
    await queryInterface.renameColumn('Session','updatedAt','updated_at' );
  },
  down: async() => {

  }
};