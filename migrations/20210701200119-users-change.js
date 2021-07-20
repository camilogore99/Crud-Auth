'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('users', 'id', {
         type: Sequelize.BIGINT,
         unique:true,
         allowNull:false
      });
      
   },
};