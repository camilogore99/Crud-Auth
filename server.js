
// Importacion para poder utilizar las variables de entorno // 
require("dotenv").config();

const PORT = process.env.PORT;
const app = require("./app");

app.listen(PORT, () => {
   console.log( `puerto ${PORT}` );
});