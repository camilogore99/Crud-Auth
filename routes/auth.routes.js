
const {Router} = require('express');
const authRouter = Router();

const authController = require('../controllers/auth.controllers');

// === Flujo de autenticacion === //
authRouter.get('/login', authController.renderLogin );
authRouter.post('/login', authController.localAuthStrategy );
authRouter.get('/registro', authController.renderRegister );
authRouter.post('/registro', authController.register );
authRouter.get( "/logout", authController.logout );

// === Autenticacion por medio de facebook y google === //
authRouter.get( '/auth/google', authController.passportGoogleStrategy );
authRouter.get( '/auth/facebook',authController.passportFBStrategy );
authRouter.get( '/auth/google/callback', authController.googleCallback );
authRouter.get( '/auth/facebook/callback', authController.facebookCallback );

//Restablecer la contraseña 
authRouter.post('/auth/reset-password', authController.resetPassword)

module.exports = authRouter;
