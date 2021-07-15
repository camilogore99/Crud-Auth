
// Importamos 
const passport = require("passport");
// Importamos el modelo users 
const { users } = require("../models");

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
passport.serializeUser( ( profile, done ) => {
   // Guarda los datos para utilizarlos despues como sesion
   return done( null, profile);
});

passport.deserializeUser( async( profile,done ) => {
   // Saca los datos del usuario atravez de su id 
   try {
      switch (profile.provider) {
         case 'google':
            profile.firstname = profile.name.givenName;
            profile.lastname  = profile.name.familyName;
            done( null, profile );
            break;
         case 'facebook':
            
            break;
         default:
            let user = await users.findByPk(profile.id, {raw: true});
            done( null, user ); // request.user
            break;
      }
   } catch (error) {
      done( error );
   }
});