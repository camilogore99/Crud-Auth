
const passport = require("passport");
const {newUser} = require('../services/auth.service');
const {emailOptions,sendMail} = require('../config/nodemailer');
const ejs = require("ejs");
const path = require('path')

const renderLogin = ( request, response, next ) => {
   response.render("pages/logIn",{title: "iniciar session"})
}

const renderRegister = ( request, response, next ) => {
   response.render("pages/register", {title: 'registro'});
}

const register = async( request, response ) => {
   // Se obtienen los datos del registro mediante el request.body  
   let { firstname, lastname, email, password } = request.body;
   try{
      // el metodo users.create es que se encarga de crear los datos en la base de datos 
      await newUser({ firstname, lastname, email, password })
      response.redirect("/registro")
   }catch(error){
      next(error);
   };
}

const logout = ( request, response ) => { 
   request.logOut(); // Quitamos la sesion activa del usuario
   return response.redirect("/login"); // redireccionamos a inicio 
}

const localAuthStrategy = passport.authenticate("local", {
   failureRedirect: '/login',
   successRedirect: '/categorias'
});


const passportGoogleStrategy = passport.authenticate("google",{
   session: true,
   scope: ['email','profile']
});

const googleCallback = passport.authenticate('google',{
   successRedirect:'/categorias',
   failureRedirect: '/login'
});


const passportFBStrategy = passport.authenticate("facebook",{
   session: true,
   scope: ['email','public_profile']
});

const facebookCallback = passport.authenticate("facebook",{
   successRedirect:'/categorias',
   failureRedirect: '/login'
});

const resetPassword = async(req, res,next) =>{
   try {
      // obtenemos el email del usuario que quiere restablecer la contraseña 
      const { email } = req.body;
      // enviar el correo cpon ñas instrucciones para el restablecimiento
      emailOptions.to = email;// va dirigido hacia el cliente 
      emailOptions.subject = "Restablecimiento de contraseña ";
      const template = await ejs.renderFile(path.join(__dirname, "..","views", "email-templates", "reset-password.ejs"),{title: "Restablecer tu contraseña"})
      emailOptions.html = template;
      await sendMail(emailOptions);
      res.send(`se a enviado la solicitud al correo ${email} `)
   } catch (error) {
      next(error);
   }
}


module.exports = {
   renderLogin,
   renderRegister,
   register,
   logout,
   localAuthStrategy,
   passportGoogleStrategy,
   passportFBStrategy,
   googleCallback,
   facebookCallback,
   resetPassword
}