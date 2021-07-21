const {Router} =require('express');
const taskRoutes = Router(); 
const protectRoute = require('../middlewares/protect-route');
const controllerTask = require('../controllers/tasks.controller');

taskRoutes.get("/tareas",protectRoute, controllerTask.renderTask );
taskRoutes.post("/tareas",protectRoute, controllerTask.createTask );
taskRoutes.get("/task/editar/:id",protectRoute,controllerTask.renderEditTask);
taskRoutes.post("/task/editar/:id",protectRoute,controllerTask.update);
taskRoutes.get("/task/borrar/:id",protectRoute,controllerTask.deleteT)

module.exports = taskRoutes;