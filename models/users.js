'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // define association here
    }
  };
  users.init({
   firstname: {
      type: DataTypes.STRING,
      validate: {
         notEmpty:true
      }
   },
   lastname: {
      type: DataTypes.STRING,
      validate: {
         notEmpty:true
      }
   },
   email: {
      type: DataTypes.STRING,
      validate: {
         isEmail: true
      }
   },
    password: {
      type: DataTypes.STRING,
      validate: {
         notEmpty:true
      }
   },
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};