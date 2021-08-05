'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('users', 'email', {
         type: Sequelize.STRING,
         unique:true,
         allowNull:false
      });
      await queryInterface.changeColumn('users', 'active', {
         type: Sequelize.BOOLEAN,
         defaultValue:true
      });
   },
   down: async() => {

  }
};