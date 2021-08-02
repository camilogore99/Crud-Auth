const {Category} = require('../models');

const getCategoriesByUser = async( userId ) => {
   try {
      let categories = await Category.findAll({ 
         where: { 
            created_by: userId 
         }, 
         raw: true 
      });
      return categories;
   } catch (error) {
      throw new Error(error)
   };
};

const categoryById = async (id) => {
   try {
      let categories = await Category.findByPk(id);
      return categories;
   } catch (error) {
      throw new Error(error)
   };
};

const createCategory = async({name,userId}) => {
   try {
      let category = await Category.create( { name, created_by: userId } );
      return category;
   } catch (error) {
      throw new Error(error)
   };
};

// Actualizacion de una Categoria 
const updateCategory = async( { name, categoryId } ) => {
   try {
      let category = await Category.update(
         { name },
         {where: {id: categoryId}}
      );
      return category;
   } catch (error) {
      throw new Error(error)
   };
};

const deleteCategory = async(categoryId) => {
   try {
      let results = await Category.destroy({ 
         where: { 
            id: categoryId 
         },
      });
      return results;
   } catch (error) {
      throw new Error(error)
   };
};

module.exports = {
   categoryById,
   getCategoriesByUser,
   createCategory,
   updateCategory,
   deleteCategory,
};