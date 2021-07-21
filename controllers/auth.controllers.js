
// ==== Importaciones ==== //
const passport = require("passport");
const {newUser} = require('../services/auth.service');
const { emailOptions, sendMail } = require('../config/nodemailer');
const ejs = require("ejs");
const path = require('path')

// renderizado del login //
const renderLogin = ( request, response ) => {
   response.render("pages/logIn",{title: "iniciar session"});
};

// renderizado del registro //
const renderRegister = ( request, response ) => {
   response.render("pages/register", {title: 'registro'});
};

// Obteniendo los datos que me da el usuario en el registro //  
const register = async( request, response ) => {
   try{
      let { firstname, lastname, email, password } = request.body; 
      await newUser({ firstname, lastname, email, password });
      response.redirect("/registro");
   }catch(error){
      next(error);
   };
};

// Cerrando la session del usuario //
const logout = ( request, response ) => { 
   request.logOut(); // Quitamos la sesion activa del usuario
   return response.redirect("/login"); // redireccionamos a inicio 
};

// Redireccion al usuario si todo sale bien || Redireccion al usuario si sale mal
const localAuthStrategy = passport.authenticate("local", {
   failureRedirect: '/login',
   successRedirect: '/categorias'
});


const passportGoogleStrategy = passport.authenticate("google",{
   session: true,
   scope: ['email','profile']
});

// Redireccion al usuario si todo sale bien google || Redireccion al usuario si sale mal por google
const googleCallback = passport.authenticate('google',{
   successRedirect:'/categorias',
   failureRedirect: '/login'
});


const passportFBStrategy = passport.authenticate("facebook",{
   session: true,
   scope: ['email','public_profile']
});

// Redireccion al usuario si todo sale bien Facebook || Redireccion al usuario si sale mal por Facebook
const facebookCallback = passport.authenticate("facebook",{
   successRedirect:'/categorias',
   failureRedirect: '/login'
});

// Obteniendo los datos para restablecer la contraseña //
const resetPassword = async(req, res,next) =>{
   try {
      const { email } = req.body;
      // El objeto emailOptions es el que traemos de config/nodmailer al cual es el cuerpo para el envio del correo 
      emailOptions.to = email;// va dirigido hacia el cliente 
      emailOptions.subject = "Restablecimiento de contraseña ";
      // ruta del Template que vamos a mostrar a la hora de enviar el correo //
      const template = await ejs.renderFile(path.join(__dirname, "..","views", "email-templates", "reset-password.ejs"),{title: "Restablecer tu contraseña"});
      emailOptions.html = template;
      await sendMail(emailOptions);
      // enviamos el mensaje al cliente que el correo se envio correctamente 
      res.send(`se a enviado la solicitud al correo ${email} `);
   } catch (error) {
      next(error);
   };
};

// Exportaciones //
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