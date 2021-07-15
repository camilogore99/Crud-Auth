
const session = require("express-session");

const sessionConf = session({
   secret: "academlo secret",
   resave: false,
   saveUninitialized: true,
});

module.exports = sessionConf;