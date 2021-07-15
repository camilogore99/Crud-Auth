
// Modulos 
const express = require("express");
const passport = require("passport");
const multer = require('multer');
const sessionConf = require('./utils/session.conf');
const path = require("path");

// Rutas 
const authRouter = require('./routes/auth.routes');
const catRouter = require('./routes/category.routes');
const userRouter = require('./routes/user.route');
const statusRouter = require('./routes/status.routes');

require("./config/passport");

const app = express();

const storage = multer.diskStorage({
   destination: ( req, res, done ) => {
      const uploadPath = path.join(__dirname, "public", "uploads", "profile_image")
      done( null, uploadPath )
   },
   filename: (req,file,done) => {
      // Obtener un arreglo con el nombre del archivo y su extencion
      const fileArray = file.originalname.split('.');
      // Sacamos la extension del archivo
      const ext = fileArray.pop();
      // Sacamos el nombre del archivo
      const fname = fileArray.pop();
      // Creamos el nombre para el archivo
      const filename = `${fname}-${Date.now()}.${ext}`;
      if (ext === "pdf") {
         return done(new Error("no se admiten archivos pdf "), null)
      }
      done(null,filename )
   }
});

const upload = multer({
   storage
});

app.use( express.urlencoded({extended: true}));

app.use( express.static(path.join(__dirname, "public")));


// ========== CONFIGURACION EJS ========== //

//1. Definiendo en donde se ubicará el directorio views
app.set('views', path.join(__dirname, 'views')); 

//2. Definiendo el motor que usaremos
app.set('view engine', 'ejs');

// ========== CONFIGURACION EJS ========== //

app.use(sessionConf);

// Middelware de terceros //
app.use(passport.initialize()); // Para poder utilizar el metodo de autenticacion passport
app.use(passport.session()); // Para habilitar las sesion con passport

app.get("/", ( request, response,) => { 
   response.render("pages/home", { title: "Inicio" })
});
app.post( "/upload-image", upload.single('image'), (req,res) => {
   const ext = req.file.originalname.split('.').pop();
   req.file.filename += ext;


   res.send("se ha subido el archivo")
});

app.use( authRouter );
app.use( catRouter );
app.use( userRouter );
app.use( statusRouter );

module.exports = app;