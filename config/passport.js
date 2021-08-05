
// Importaciones  
const passport = require("passport");
// Importamos el modelo users 
const { users } = require("../models");
const {newUser,checkUserExist, linkUserProvider,randPasswd} = require('../services/auth.service')
// Importamos la estrategia local //
const localStrategy = require("passport-local").Strategy;
// Importamos la estrategia de google //
const googleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

require("dotenv").config();

// ====== ESTRATEGIA LOCAL ====== // 

// Definimos cual va ser la estrategia que vamos a utilizar para passport
passport.use( new localStrategy({
   usernameField: 'email'
}, async( email, password, done ) => {
   try{
      // El metodo findOne va buscar el registro en la base de datos
      // Select * from users where email = email limit 1;
      let result = await users.findOne( {where: {email} } );
      
      if ( result && result.password === password ) {
         return done( null, result ) // se autentico correctamente  -> serializeUser 
      }
      return done( null, false ) // No estaria autenticando el usuario
   }catch( error ){
      done( error )
   }
}));

// ====== ESTRATEGIA FACEBOOK  ====== // 
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_REDIRECT_URI
},(accessToken, refreshToken, profile, done) => {
    return done( null, profile );
  }
));

// ====== ESTRATEGIA FACEBOOK  ====== // 

// ====== ESTRATEGIA GOOGLE OAuth 2.0  ====== // 
passport.use( new googleStrategy({
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_SECRET,
   callbackURL: process.env.GOOGLE_REDIRECT_URI
}, ( accessToken, refreshToken, profile, done ) => {
   //accessToken -> token de acceso para obtener los recursos del servidor de google
   //refreshToken -> me va permitir obtener un nuevo token cuando el token anterior expire
   //profile -> datos del perfil
   return done( null, profile );
}));


// SerializeUser firma los datos del usuario  
passport.serializeUser( async( profile, done ) => {
   // La validacion sera para google y facebook 
   
   if (profile.provider) {
      let email = profile.email;
      //1. Comprobar si el correo obtenido ya esta registrado en nuestro sistemas 
      //2. Si no existe ... -> crear una cuenta con los datos que recibo del proveedor 
      //2. Si existe ... -> vincular la cuenta local con la de google 
      let user = await checkUserExist(email);
      console.log("aqui va el usuario -<-<-<-<-<-<");
      console.log(user);
      let providerId = profile.id;
      // objeto con el usuario de gooogle 

      let firstname = profile.provider === "google" ? profile.given_name : profile.displayName;
      let lastname = profile.provider === "google" ? profile.family_name : "null";

      let userObj = { 
         firstname, 
         lastname, 
         email: profile.email, 
         password: "12345"
      };
      
      if (user) {
         let userId = user.id;        
         // ligamos la cuenta local con la del proveedor 
         await linkUserProvider(providerId, userId, profile.provider);
         // Regresamos la cuenta local 
         return done( null, user);
      }else{
         // creamos la cuenta local para el proveedor
         console.log("no esta crado");
         console.log("y este es el objeto >>>>");
         console.log(userObj);
         let newUserObj =  await newUser(userObj);
         let userId = newUserObj.id;
         // ligamos la cuenta local con la del proveedor 
         await linkUserProvider(providerId, userId, profile.provider);
         return done( null, newUserObj);
      };
   };
   return done( null, profile);
});

passport.deserializeUser( async( profile,done ) => {

   try {
      switch (profile.provider) {
         case 'google':
            // generado por google 
            profile.firstname = profile.name.givenName;
            profile.lastname  = profile.name.familyName;
            done( null, profile );
            break;
         case 'facebook':
            profile.firstname = profile.displayName;
            profile.lastname  = "";
            done( null, profile );
            break;
         default:
            let user = await users.findByPk(profile.id, {raw: true});
            done( null, user ); // request.user
            break;
      }
   } catch (error) {
      done( error );
   };
});