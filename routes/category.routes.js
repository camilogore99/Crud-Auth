
const {Router} = require('express');
const catController = require('../controllers/category.controller');
const protectRoute = require('../middlewares/protect-route');


const catRouter = Router();

catRouter.get('/categorias', protectRoute, catController.renderCat);
catRouter.post('/categorias',protectRoute, catController.createdCat);
catRouter.get('/categorias/editar/:id', protectRoute, catController.renderEdit );
catRouter.get('/categorias/borrar/:id', protectRoute, catController.deleteCat );
catRouter.post('/categorias/editar/:id', protectRoute, catController.update );

module.exports = catRouter;