
const express = require("express");
const path = require("path")
// app contiene todo lo de expres, ( caracteristicas, metodos );
const app = express();
const PORT = 8000;
let visitas = 0;
// ========== MIDDLEWARES  ========== //

app.use(( request, response, next ) => {
   console.log( "hola mundo" );
   next();
});

app.use(( request, response, next ) => {
   visitas++;
   console.log( "visita no."+ visitas );
   // if ( visitas === 5 ) {
   //    return next( new Error("la pagina a alcanzado el limite de solicitudes ") );
   // }
   return next();
});


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
   let pathHome = path.join(__dirname, "public", "index.html")
   response.sendFile( pathHome )
});

app.get("/contacto", ( request, response, next ) => {
   response.send('HelLo desde la pagina contacto')
});

app.get("/productos", ( request, response, next ) => {
   response.send('HelLo desde la pagina productos')
});

app.get("/tienda", ( request, response, next ) => {
   response.redirect("/productos")
});

app.post("/registro", ( request, response ) => {

   // ===== obtener los datos que me envia el cliente ===== //
   const user = request.body;
   console.log( request.headers );
   console.log(user);
   response.send("se han recibido los datos")
} )



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