
// Importaciones //
const { getCategoriesByUser } = require('../services/category.service');
const {getStatusByUser } = require('../services/status.service');
const { 
   getTaskByUser,
   createdTask,
   updateTask,
   deleteTask, 
   getTaskById,
} = require('../services/task.service');

// ===== Funciones que vamos a utilizar en las rutas ===== //

// Renderizado de la pagina de editar las tareas  //
const renderEditTask = async(req,res) => {
   try {
      // Obtenemos los datos // 
      const { id: userId,firstname, lastname} = req.user;
      let {id} = req.params;
      let username = `${firstname} ${lastname}`;
      // Hacemos el llamado a las funciones que traen las tareas mediante el id //
      let categories = await getCategoriesByUser( userId );
      let status = await getStatusByUser( userId );
      let task = await getTaskById(id);
      // Respondemos con la pagina de editar tareas //
      return res.render("pages/edit-task", { 
         id,
         title:'Editar tareas', 
         username,
         categories,
         status,
         titleTask: task.title,
         description: task.description,
      });
   } catch (error) {
      throw new Error(error);
   };
};

// Renderizado de las tareas para cada uno de los usuarios //
const renderTask = async(req, res) => {
   try {
      // Obtenemos los datos del usuario //
      const {id: userId, firstname, lastname} = req.user;
      const username = `${firstname} ${lastname}`;
      // Hacemos el llamado a las funciones que nos trae las tareas del usuario //
      let categories = await getCategoriesByUser( userId );
      let status = await getStatusByUser( userId );
      let task = await getTaskByUser( userId );
      // creamos un arreglo de ausuarios con las categorias y estados que el usuario a selecionado //
      const arrCategories = [];
      const arrStatus = [];
      for (let i = 0; i < task.length; i++) {
         const element = task[i];
         for (let x = 0; x < categories.length; x++) {
            const element2 = categories[x];
            if (element.category_id === element2.id) {
               arrCategories.push(element2.name);   
            };            
         };
      };
      for (let i = 0; i < task.length; i++) {
         const element = task[i];
         for (let x = 0; x < status.length; x++) {
            const element2 = status[x];
            if (element.status_id === element2.id) {
               arrStatus.push(element2.status_name);   
            };            
         };
      };

      // Respondemos con la pagina de tareas //
      return res.render("pages/tasks",{
         title: "tareas",
         username,
         categories,
         status,
         task,
         arrCat: arrCategories,
         arrStatus
      });
   } catch (error) {
      throw new Error(error);
   };
};


// Creando una tarea del usuario //
const createTask = async( req, res ) => {
   try {
      // Obtenemos los datos //
      const { title, description, categories, state} = req.body;
      const {id: userId} = req.user;
      // Hacemos el llamado a la funcion que nos crea las tareas del usuario //
      const result = await createdTask({ 
         title, 
         description, 
         userId,
         categoryId: categories,
         status: state 
      });
      // Respondemos con la pagina de tareas //
      res.redirect("/tareas");
   } catch (error) {
      throw new Error(error.stack);
   };
};

// Actualizacion de las tareas  //
const update = async( req, res) => {
   try {
      // Obtenemos los datos //
      const { id: idTask } = req.params;
      const { 
         title: titleTask, 
         description: descriptionTask, 
         categories: categoryTask, 
         state: statusTask
      } = req.body;
      // Hacemos el llamado a la funcion que nos actualiza las tareas del usuario //
      const result = await updateTask({
         idTask, 
         titleTask,
         descriptionTask, 
         categoryTask, 
         statusTask 
      });
      // Respondemos con la pagina de Tareas //
      res.redirect("/tareas");
   } catch (error) {
      throw new Error(error);
   };
};

// Eliminacion de una Tarea //
const deleteT = async(req,res) => {
   try {
      // Obtenemos el id de la tarea a eliminar //
      const { id: idTask } = req.params;
      // Hacemso el llamado a la funcion que la elimina //
      await deleteTask(idTask);
      // Redireccionamos hacia la pagina de estados  //
      res.redirect("/tareas");
   } catch (error) {
      throw new Error(error);
   };
};

// Exportaciones //
module.exports = {
   renderTask,
   createTask,
   renderEditTask,
   update,
   deleteT
};