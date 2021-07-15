'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    static associate(models) {
      // define association here
      status.belongsTo(models.users,{
         foreignKey:'created_by'
      });
    }
  };
  status.init({
    status_name: DataTypes.STRING,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'status',
  });
  return status;
};