
const express = require("express");
const path = require("path");
const taskArray = require('./task.json');
const {users, Sequelize} = require("./models");

// importacion de la estrategia para passport //
const passport = require("passport");
// importacion para guardar la sesion //
const session = require("express-session");
const sequelizeStore = require("connect-session-sequelize")(session.Store)
require("./config/passport");

// app contiene todo lo de express, ( caracteristicas, metodos );
const app = express();
const PORT = 8000;

let { sequelize } = require("./models")

// ========== CONFIGURACION EJS ========== //

//1. Definiendo en donde se ubicará el directorio views
app.set('views', path.join(__dirname, 'views')); 

//2. Definiendo el motor que usaremos
app.set('view engine', 'ejs');

// asi guardamos la session en la memoria del servidor  
app.use( session({
   secret: "academlo secret",
   resave: false,
   saveUninitialized: true,
   store: new sequelizeStore({
      expiration: 1 * 60 * 60 * 1000,
      db: sequelize
   })
}));

// Middelware de terceros //
app.use(passport.initialize()); // Para poder utilizar el metodo de autenticacion passport
app.use(passport.session()); // Para habilitar las sesion con passport

// ========== MIDDLEWARES  ========== //

// ========== MIDDLEWARES INCORPORADO ( build-in ) ========== //

// express.static nos va servir para poder servir archivos de forma estatica
app.use( express.static(path.join(__dirname, "public")));

// Permite procesar los datos enviados por el cliente atraves de x-www-form-urlencoded
app.use( express.urlencoded({extended: true}));

// Permite procesar los datos enviados por el cliente atraves de application/json
app.use( express.json());

// ========== MIDDLEWARES DE APLICACION ========== //

// Middleware de aplicacion trabaja con los metodos HTTP( GET,POST,PUT,DELETE )
// Van a manejar los objetos request, response y una funcion llamada next()

app.get("/", ( request, response,) => { 
   response.render("pages/home", {title: "Inicio"})
});

app.get("/tareas", ( request, response ) => { 
   response.render("pages/tasks", {
      title: "Tareas",
      message: "Lista de tareas",
      items: taskArray
   });
});

app.get("/registro", (request, response ) => {
   response.render("pages/register", {title: 'registro'});
});

app.get("/login",( request, response ) => {
   response.render("pages/logIn",{title: "iniciar session"})
});

app.post("/login", passport.authenticate("local", {
   failureRedirect: '/login',
   successRedirect: '/categorias'
}), (error, req, resp, next) => {
   if (error) return next(error)
});

app.get( "/categorias", ( request, response ) => {
   // request.isAuthenticated() nos va ayudar a saber si el usuario esta autenticado 
   if ( request.isAuthenticated() ) {
      let fullNmae = `${request.user.firstname} ${request.user.lastname}`
      return response.render("pages/categories",{title:'categorias', username: fullNmae})  
   }
   return response.redirect("/login")
});

app.get( "/logout" ,( request, response ) => {
   // request.logOut() nos saca de la sesion 
   request.logOut();
   response.redirect("/login")

});

app.post("/registro", async(request, response,next ) => {
   // Se obtienen los datos del registro mediante el request.body
   let { firstname, lastname, email, password } = request.body;
   try{
      // el metodo users.create es que se encarga de crear los datos en la base de datos 
      await users.create({ firstname, lastname, email, password })
      response.redirect("/registro")
   }catch(error){
      next(error);
   };
});

app.use(( request, response ) => {
   let pathNotFound = path.join(__dirname, "public", "404.html")
   response.status(404).sendFile( pathNotFound )
});

// ========== MIDDLEWARE PARA EL MANEJO DE ERRORES ========== //  

app.use((error, request, response ) => {
   const errors = require('./utils/errorMessage');
   response.status(404).send(errors[error.name]);
});

app.listen(PORT, () => {
   console.log( `puerto ${PORT}` );
});