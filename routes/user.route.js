
const {Router} = require('express');
const userController = require('../controllers/user.contreller')

const router = Router();

router.get("/users",userController.getAll);

module.exports = router;