
const express = require("express");
const path = require("path")
// app contiene todo lo de expres, ( caracteristicas, metodos );
const app = express();
const PORT = 8000;

// ========== CONFIGURACION EJS ========== //

//1. Definiendo en donde se ubicará el directorio views
app.set('views', path.join(__dirname, 'views')); 
//2. Definiendo el motor que usaremos
app.set('view engine', 'ejs');


// ========== MIDDLEWARES  ========== //

// ========== MIDDLEWARES INCORPORADO ( build-in ) ========== //

// express.static nos va servir para poder servir archivos de forma estatica
app.use( express.static(path.join(__dirname, "public")));

// Permite procesar los datos enviados por el cliente atraves de x-www-form-urlencoded
app.use( express.urlencoded());

// Permite procesar los datos enviados por el cliente atraves de application/json
app.use( express.json());



// ========== MIDDLEWARES DE APLICACION ========== //

// .use() sirve para atender cualquier tipo de peticion ( comodin )
// app.use()

// Middleware de aplicacion trabaja con los metodos HTTP( GET,POST,PUT,DELETE )
// Van a manejar los objetos request, response y una funcion llamada next()

app.get("/", ( request, response, next ) => { 
   
   response.render("pages/home", {title: "Inicio", message: "hola mundo con EJS"})
});

app.get("/tareas", ( request, response, next ) => { 
   let taskArray = [
      {
      "id": 1,
      "title": "Yellow mongoose",
      "description": "Removal of Infusion Device from GU Tract, Via Opening"
      }, 
      {
      "id": 2,
      "title": "Black vulture",
      "description": "Excision of Splenic Vein, Percutaneous Approach, Diagnostic"
      }, {
      "id": 3,
      "title": "Crow, house",
      "description": "Bypass 3 Cor Art from Thor Art w Zooplastic, Perc Endo"
      }, {
      "id": 4,
      "title": "Macaw, green-winged",
      "description": "Bypass R Kidney Pelvis to R Ureter w Synth Sub, Perc Endo"
      }, {
      "id": 5,
      "title": "Brocket, brown",
      "description": "Resection of Left Diaphragm, Open Approach"
      }, {
      "id": 6,
      "title": "Lourie, grey",
      "description": "Drainage of Face Artery with Drainage Device, Perc Approach"
      }, {
      "id": 7,
      "title": "Asian elephant",
      "description": "Measurement of POC, Cardiac Electr Activity, Extern Approach"
      }, {
      "id": 8,
      "title": "Nuthatch, red-breasted",
      "description": "Removal of Autol Sub from Occip Jt, Perc Endo Approach"
      }, {
      "id": 9,
      "title": "Hoary marmot",
      "description": "Dilate R Com Iliac Art, Bifurc, w 3 Drug-elut, Open"
      }, {
      "id": 10,
      "title": "Grison",
      "description": "Dilation of L Innom Vein with Intralum Dev, Perc Approach"
      }, {
      "id": 11,
      "title": "Steenbuck",
      "description": "Release Lumbosacral Joint, Percutaneous Approach"
      }, {
      "id": 12,
      "title": "Chilean flamingo",
      "description": "Revision of Drain Dev in L Sternoclav Jt, Extern Approach"
      }, {
      "id": 13,
      "title": "Sugar glider",
      "description": "Drainage of Left Adrenal Gland, Perc Endo Approach, Diagn"
      }, {
      "id": 14,
      "title": "Mongoose, yellow",
      "description": "Introduction of Radioact Subst into Eye, Perc Approach"
      }, {
      "id": 15,
      "title": "Waxbill, black-cheeked",
      "description": "Extirpation of Matter from Hepatic Artery, Open Approach"
      }];
   response.render("pages/tasks", {title: "Tareas", message: "Lista de tareas", items: taskArray})
} );


app.use(( request, response, next ) => {
   let pathNotFound = path.join(__dirname, "public", "404.html")
   response.status(404).sendFile( pathNotFound )
});

// ========== MIDDLEWARE PARA EL MANEJO DE ERRORES ========== //  

app.use((error, request, response, next) => {
   console.log(error.message);
   response.status(404).send(error.message)
})

app.listen(PORT, () => {
   console.log( `servidor escuchando sobre el puerto ${PORT}` );
});