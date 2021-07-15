'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialNetwork extends Model {
    static associate(models) {
      // define association here
    }
  };
  SocialNetwork.init({
    user_id: DataTypes.INTEGER,
    provider: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SocialNetwork',
    tableName: 'social_networks'
  });
  return SocialNetwork;
};
