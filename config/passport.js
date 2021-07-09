
// Importamos 
const passport = require("passport");
// Importamos el modelo users 
const { users } = require("../models")

// Importamos la estrategia local //
const localStrategy = require("passport-local").Strategy;

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

// SerializeUser firma los datos del usuario  
passport.serializeUser( ( user, done ) => {
   // Guarda los datos para utilizarlos despues como sesion
   return done( null, user.id )
});

passport.deserializeUser( async( id,done ) => {
   // Saca los datos del usuario atravez de su id 
   try {
      let user = await users.findByPk(id, {raw: true});
      done( null, user ); // request.user
   } catch (error) {
      done( error );
   }
});