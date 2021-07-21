const { Task } = require('../models');

const createdTask = async( { title, description, userId,categoryId,status } ) => {
   try {
      let createTask = await Task.create( {
         title,
         description,
         user_id: userId,
         category_id: categoryId,
         status_id: status
      });
      return createTask;
   } catch (error) {
      throw new Error(error)
   }
};

const getTaskByUser = async( userId ) => {
   try {
      let tasks = await Task.findAll({ 
         where: { 
            user_id: userId 
         }, 
         raw: true 
      });
      return tasks
   } catch (error) {
      throw new Error(error)
   }
}

const getTaskById = async(id) => {
   try {
      let task = await Task.findByPk(id);
      return task;
   } catch (error) {
      throw new Error(error)
   }
}

const updateTask = async( {idTask, titleTask, descriptionTask, categoryTask, statusTask}  ) => {
   try {
      let values = {
         title: titleTask,
         description: descriptionTask,
         category_id: categoryTask,
         status_id: statusTask,
      }
      let condition = {
         where:{id:idTask}
      }
      options = {multi: true}
      let task = await Task.update(values, condition, options);
      return task;
   } catch (error) {
      throw new Error(error)
   }
}
const deleteTask = async(idTask) => {
   try {
      const reslutDelete = await Task.destroy({
         where: {
            id: idTask
         }
      })
      return reslutDelete
   } catch (error) {
      throw new Error(error)
   }
};

module.exports = {
   createdTask,
   getTaskByUser,
   getTaskById,
   updateTask,
   deleteTask
}