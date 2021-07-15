'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class users extends Model {
      static associate(models) {
         // Relacion hasMany -> uno a muchos 
         users.hasMany(models.Category,{
            foreignKey: 'created_by',
            onDelete: 'cascade'
         });
         users.hasMany(models.Task, {
            foreignKey: 'user_id'
         });
         users.hasMany(models.status,{
            foreignKey: 'created_by'
         })
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