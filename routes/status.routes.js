
const {Router} = require('express');
const statusRouter = Router();
const protectRoute = require('../middlewares/protect-route');
const statusContreller = require('../controllers/status.controller');

statusRouter.get( "/estatus", protectRoute, statusContreller.renderStatus )
statusRouter.post( "/estatus", protectRoute, statusContreller.createdStatusController );
statusRouter.get( "/estatus/editar/:id", protectRoute, statusContreller.renderEditStatus );
statusRouter.post( "/estatus/editar/:id", protectRoute, statusContreller.update );
statusRouter.get( "/estatus/borrar/:id", protectRoute, statusContreller.deleteSta );

module.exports = statusRouter;