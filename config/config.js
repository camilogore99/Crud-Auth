// hacemos la impotacion para poder traer las variables de entorno con el require("dotenv").config();  // 
require("dotenv").config();

module.exports = {
   development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: "postgres",
      define: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      }
   },
   test: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: "postgres",
      define: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      }
   },
   production: {
      use_env_variable: 'DATABASE_URL',
      define: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
      dialectOptions: {
         ssl: {
            require: true,
            rejectUnauthorized: false
         }
      }
   },
};
