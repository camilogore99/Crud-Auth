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
         updatedAt: 'updated_at'
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
         updatedAt: 'updated_at'
      }
   },
   production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql"
   }
}
