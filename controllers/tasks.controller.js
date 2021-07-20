
const { getCategoriesByUser } = require('../services/category.service');
const {getStatusByUser } = require('../services/status.service');
const { createdTask, getTaskByUser,getTaskById } = require('../services/task.service');



const renderEditTask = async(req,res) => {
   try {
      const { firstname, lastname} = req.user;
      let {id} = req.params;
      let username = `${firstname} ${lastname}`;
      let task = await getTaskById(id);

      return res.render("pages/edit-task", { 
         id,
         title:'Editar tareas', 
         username,
         titleTask: task.title,
         description: task.description,
         category: task.category_id,
         status: task.status_id
      }); 
   } catch (error) {
      throw new Error(error)
   };
}

const renderTask = async(req, res) => {
   try {
      const {id: userId, firstname, lastname} = req.user;
      const username = `${firstname} ${lastname}`
      let categories = await getCategoriesByUser( userId );
      let status = await getStatusByUser( userId );
      let task = await getTaskByUser( userId );
      const arrCategories = [];
      const arrStatus = [];
      
      for (let i = 0; i < task.length; i++) {
         const element = task[i];
         for (let x = 0; x < categories.length; x++) {
            const element2 = categories[x];
            if (element.category_id === element2.id) {
               arrCategories.push(element2.name)   
            }            
         }
      }

      for (let i = 0; i < task.length; i++) {
         const element = task[i];
         for (let x = 0; x < status.length; x++) {
            const element2 = status[x];
            if (element.status_id === element2.id) {
               arrStatus.push(element2.status_name)   
            }            
         }
      }

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
      throw new Error(error)
   }
}

const createTask = async( req, res ) => {
   try {
      const { title, description, categories, state} = req.body;
      const {id: userId} = req.user; 
      const result = await createdTask( { title, description, userId,categoryId: categories,status: state } );
      res.redirect("/tareas");
   } catch (error) {
      throw new Error(error.stack);
   }
};


module.exports = {
   renderTask,
   createTask,
   renderEditTask
}