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


module.exports = {
   createdTask,
   getTaskByUser,
   getTaskById
}