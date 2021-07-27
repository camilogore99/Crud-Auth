
// Importaciones //
const {
   categoryById,
   getCategoriesByUser,
   createCategory,
   updateCategory,
   deleteCategory,
} = require('../services/category.service');

// ===== Funciones que vamos a utilizar en las rutas ===== // 


// Renderizado de la pagina de editar las categorias //
const renderEdit = async( request, response, next ) => {
   try {
      // Obtenemos los datos // 
      let { firstname, lastname } = request.user;
      let {id} = request.params;
      let fullNmae = `${firstname} ${lastname}`;
      //Hacemos el llamado a la funcion que trae la categoria mediante el id //
      let category = await categoryById(id);
      // Respondemos con la pagina de editar categorias //
      return response.render("pages/edit-category", { 
         id,
         name: category.name,
         title:'Editar categorias', 
         username: fullNmae,
      }); 
   } catch (error) {
      next(error);
   };
};

// Renderizado de una categoria para cada uno de los usuarios //
const renderCat = async( request, response, next ) => {
   try {
      // Obtenemos los datos del usuario // 
      let { id, firstname, lastname } = request.user;
      let fullName = `${firstname} ${lastname}`;
      // Hacemos el llamado a la funcion que nos trae las categorias del usuario //
      let categories = await getCategoriesByUser(id);
      // Respondemos al cliente con la pagina categorias  
      return response.render("pages/categories", { 
         title:'categorias', 
         username: fullName,
         categories
      });
   } catch (error) {
      next(error);
   };
};

// Creando una categoria del usuario //
const createdCat = async(req, res, next) => {
   try {
      // Obtenemos los datos //
      let {id} = req.user;
      let {name} = req.body;
      // Hacemos el llamado a la funcion que crea la categoria // 
      await createCategory({ name, userId: id });
      // Redireccionamos a la pagina de categrias //
      res.redirect('/categorias');
   } catch (error) {
      next(error);
   };
};

// Actualizacion de la categoria //
const update = async (request, response, next) => {
    try {
       // Obtenemos los datos //
      let {id: categoryId} = request.params;
      let {name} = request.body;
      // Hacemos el llamado de la funcion que nos actualiza las categorias //
      await updateCategory({ name, categoryId });
      // Redireccionamos hacia las categorias despues de actualizar //
      response.redirect('/categorias');
   } catch (error) {
      next(error);
   };
};

// Eliminacion de una categoria //
const deleteCat = async(req, res, next) => {
   try {
      // Obtenemos el id de la categoria a eliminar // 
      let categoryId = req.params.id;
      // Hacemso el llamado a la funcion que la elimina //
      await deleteCategory(categoryId);
      // Redireccionamos hacia la pagina categorias //
      res.redirect('/categorias');
   } catch (error) {
      next(error);
   };
};



// Exportaciones //
module.exports = {
   renderCat,
   createdCat,
   update,
   deleteCat,
   renderEdit,
}