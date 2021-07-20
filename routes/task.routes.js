const {Router} =require('express');
const taskRoutes = Router(); 
const protectRoute = require('../middlewares/protect-route');
const controllerTask = require('../controllers/tasks.controller');

taskRoutes.get("/tareas",protectRoute, controllerTask.renderTask );
taskRoutes.post("/tareas",protectRoute, controllerTask.createTask );
taskRoutes.get("/task/editar/:id",protectRoute,controllerTask.renderEditTask)
// taskRoutes.get("task/editar",protectRoute,controllerTask)

module.exports = taskRoutes;