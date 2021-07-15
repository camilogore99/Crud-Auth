'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
       // belongsTo
      Category.belongsTo(models.users, {
         foreignKey: 'created_by'
      });
    }
  };
  Category.init({
    name: DataTypes.STRING,
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories'
  });
  return Category;
};
