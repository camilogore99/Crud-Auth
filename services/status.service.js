
// Importaciones 
const { status } = require('../models');

// Funcion para obtener los estados mediante el id  
const statusByiD = async( id ) => {
   // El metodo findByPk encuentra los estados creados por el usuario mediante el id del usuario
   try {
      let stateUser = await status.findByPk(id);
      // Retornamos el estado encontrado
      return stateUser;
   } catch (error) {
      throw new Error(error);
   };
};

// Funcion para obtener los estados mediante el usuario 
const getStatusByUser = async( userId ) => {
   try {
      // El metodo findAll encuentra los estados creados por el usuario mediante el id  
      let statuses = await status.findAll({ 
         where: { 
            created_by: userId 
         }, 
         raw: true 
      });
      // Retornamos los estado encontrado del usuario 
      return statuses;
   } catch (error) {
      throw new Error(error);
   };
};

// Funcion para craer un estado para cada usuario 
const createdStatus = async( { name, id } ) => {
   try {
      // El metodo create crea un estado en la base de datos 
      let createStatus = await status.create( { status_name: name, created_by: id } );
      // Retornamos el estado creado
      return createStatus;
   } catch (error) {
      throw new Error(error);
   };
};

// Funcion para actualizar un estado 
const updateStatus = async( { name,statusId } ) => {
   try {
      // El metodo update actualiza un estado en la bas de datos 
      let statusUser = await status.update(
         { status_name: name },
         {where: { id: statusId }}     
         );
         // Retornamos el estado actulizado
         return statusUser;
      } catch (error) {
         throw new Error(error);
      };
   };
   
   // Funcion que elimina un estado 
   const deleteStatus = async(statusId) => {
      try {
         // El metodo destroy elimina un estado de la base de datos 
         let statusDelete = await status.destroy({
            where: {
               id: statusId
            }
         });
         // Retornamos los estados sin el estado eliminado
         return statusDelete;
   } catch (error) {
      throw new Error(error);
   };
};

// Exportaciones 
module.exports = {
   createdStatus,
   getStatusByUser,
   statusByiD,
   updateStatus,
   deleteStatus
};