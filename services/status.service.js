const { status } = require('../models');

const statusByiD = async( id ) => {
   try {
      let stateUser = await status.findByPk(id);
      return stateUser;
   } catch (error) {
      throw new Error(error)
   };
} 

const getStatusByUser = async( userId ) => {
   try {
      let statuses = await status.findAll({ 
         where: { 
            created_by: userId 
         }, 
         raw: true 
      });
      return statuses;
   } catch (error) {
      throw new Error(error)
   }
}

const createdStatus = async( { name, id } ) => {
   try {
      let createStatus = await status.create( { status_name: name, created_by: id } );
      return createStatus
   } catch (error) {
      throw new Error(error)
   }
}

const updateStatus = async( { name,statusId } ) => {
   try {
      let statusUser = await status.update(
         { status_name: name },
         {where: { id: statusId }}     
      );
      return statusUser;
   } catch (error) {
      throw new Error(error);
   }
}

const deleteStatus = async(statusId) => {
   try {
      let statusDelete = await status.destroy({
         where: {
            id: statusId
         }
      });
      return statusDelete
   } catch (error) {
      throw new Error(error);
   }
}

module.exports = {
   createdStatus,
   getStatusByUser,
   statusByiD,
   updateStatus,
   deleteStatus
}