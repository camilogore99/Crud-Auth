// importacion de los modelos para hacer la creacion en la base de datos 
const { users, SocialNetwork} = require('../models');


// Creamos la funcion que resive los datos de un usuario que se va crear mediante la estrategia local 
const newUser = async({ firstname, lastname, email, password }) => {
   try {
      let user = await users.create({firstname, lastname, email, password });
      return user;
   } catch (error) {
      
      throw new Error(error);
   };
};


// Creamos la funcion que nos va revisar si un usuario ya existe en la base de datos 
const checkUserExist = async(email) => {
   try {
      let user = await users.findOne({ where: {email}, raw: true });
      return user;
   } catch (error) {
      throw new Error(error.stack);
   };
};

// Creamos la funcion que nos va guardar los datos en la base de datos en la columna SocialNetwork 
const linkUserProvider = async( providerId, userId, provider ) => {
   try {
      // el motodo findOrCreate busca si el usuario ya existe mediante el id y en caso de que no esta lo crea 
      let result = await SocialNetwork.findOrCreate({ 
         where: {id: providerId}, 
         defaults: {
         id: providerId,
         user_id: userId,
         provider
      }});
      return result;
   } catch (error) {
      throw new Error(error);
   };
};

const randPasswd = async() => {
   return '12345';
};


// Exportaciones 
module.exports = {
   newUser,
   checkUserExist,
   linkUserProvider,
   randPasswd
};