
// Impotaciones 
const { Task } = require('../models');

// Creamos la funcion para crear la tarea 
const createdTask = async( { title, description, userId,categoryId,status } ) => {
   try {
      //El metodo created crea una nueva tarea en la base de datos 
      let createTask = await Task.create( {
         title,
         description,
         user_id: userId,
         category_id: categoryId,
         status_id: status
      });
      // Retornamos la tarea creada 
      return createTask;
   } catch (error) {
      throw new Error(error);
   };
};

// Creamos la funcion para obtener las tareas mediante el id del usuario  
const getTaskByUser = async( userId ) => {
   try {
      //El metodo findAll se encarga de buscar las tareas de cada usuario  
      let tasks = await Task.findAll({ 
         where: { 
            user_id: userId 
         }, 
         raw: true 
      });
      // Retornamos las tarea 
      return tasks;
   } catch (error) {
      throw new Error(error);
   };
};

// Creamos la funcion para obtener las tareas mediante el id de la tarea 
const getTaskById = async(id) => {
   try {
      //El metodo findByPk se encarga de buscar las tareas de cada usuario mediante el id   
      let task = await Task.findByPk(id);
      // Retornamos la tarea 
      return task;
   } catch (error) {
      throw new Error(error);
   };
};

// Creamos la funcion para obtener actualizar las tareas  
const updateTask = async( {idTask, titleTask, descriptionTask, categoryTask, statusTask}  ) => {
   try {
      // Creamos el objeto que vamos a enviar para crear las tareas 
      let values = {
         title: titleTask,
         description: descriptionTask,
         category_id: categoryTask,
         status_id: statusTask,
      }
      // Creamos la condicion de la tarea que se va actulizar (Where)
      let condition = {
         where:{id:idTask}
      }
      // Para actualizar la base de datos nos pide como requisito esta opcion
      options = {multi: true}
      //El metodo update se encarga de actualizar la tarea en la base de datos    
      let task = await Task.update(values, condition, options);
      // Retornamos la tarea Actualizada
      return task;
   } catch (error) {
      throw new Error(error);
   };
};


// Creamos la funcion para eliminar una tarea de la base de datos   
const deleteTask = async(idTask) => {
   try {
      //El metodo destroy se encarga de eliminar la tarea en la base de datos    
      const reslutDelete = await Task.destroy({
         where: {
            id: idTask
         }
      });
      // Retornamos las tareas sin la eliminada 
      return reslutDelete;
   } catch (error) {
      throw new Error(error);
   };
};

//Exportaciones 
module.exports = {
   createdTask,
   getTaskByUser,
   getTaskById,
   updateTask,
   deleteTask
}