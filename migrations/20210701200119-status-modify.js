'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('statuses','createdAt','created_at' );
    await queryInterface.renameColumn('statuses','updatedAt','updated_at' );
  },
};