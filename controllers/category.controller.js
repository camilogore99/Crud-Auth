const {
   categoryById,
   getCategoriesByUser,
   createCategory,
   updateCategory,
   deleteCategory,
} = require('../services/category.service');

const renderCat = async( request, response, next ) => {
   let { id, firstname, lastname } = request.user;
   try {
      let fullNmae = `${firstname} ${lastname}`;
      // Obtenemos las categorias del usuario 
      let categories = await getCategoriesByUser(id);
      return response.render("pages/categories", { 
         title:'categorias', 
         username: fullNmae,
         categories
      }); 
   } catch (error) {
      next(error)
   };
} 

const createdCat = async(req, res, next) => {
   try {
      let {id} = req.user;
      let {name} = req.body;
      await createCategory({ name, userId: id });
      res.redirect('/categorias')
   } catch (error) {
      next(error);
   };

};

const deleteCat = async(req, res, next) => {
   // obtenemos el parametro id
   try {
      let categoryId = req.params.id;
      await deleteCategory(categoryId);
      res.redirect('/categorias')
   } catch (error) {
      next(error);
   };
};

const renderEdit = async( request, response, next ) => {
   let { firstname, lastname } = request.user;
   let {id} = request.params;
   try {
      let fullNmae = `${firstname} ${lastname}`;
      let category = await categoryById(id)
      return response.render("pages/edit-category", { 
         id,
         name: category.name,
         title:'Editar categorias', 
         username: fullNmae,
      }); 
   } catch (error) {
      next(error)
   };
};

const update = async (request, response, next) => {
    try {
      let {id: categoryId} = request.params;
      let {name} = request.body;
      await updateCategory({ name, categoryId });
      response.redirect('/categorias')
   } catch (error) {
      next(error);
   }
};


module.exports = {
   renderCat,
   createdCat,
   update,
   deleteCat,
   renderEdit,
}