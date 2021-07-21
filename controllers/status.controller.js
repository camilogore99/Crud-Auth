
// Importaciones //
const { 
   getStatusByUser,
   createdStatus,
   updateStatus,
   deleteStatus,
   statusByiD,
} = require("../services/status.service");

// ===== Funciones que vamos a utilizar en las rutas ===== //

// Renderizado de la pagina de editar las estados //
const renderEditStatus = async( req, res ) => {
   try {
      // Obtenemos los datos // 
      const {firstname, lastname} = req.user;
      let {id} = req.params;
      const username = `${firstname} ${lastname}`;
      //Hacemos el llamado a la funcion que trae los estados mediante el id //
      const statusName = await statusByiD(id);
      // Respondemos con la pagina de editar estados // 
      return res.render("pages/edit-status",{
         title:"editar estado",
         id,
         username,
         name: statusName.status_name
      });
   } catch (error) {
      throw new Error(error);
   };
};

// Renderizado de los estados para cada uno de los usuarios //
const renderStatus = async( req, res, next ) => {
   try {
      // Obtenemos los datos del usuario //
      const {id, firstname, lastname} = req.user;
      const username = `${firstname} ${lastname}`;
      // Hacemos el llamado a la funcion que nos trae los estados del usuario //
      const status = await getStatusByUser(id);
      // Respondemos con la pagina de editar estados //
      return res.render("pages/status",{
         title:"estados",
         username,
         status
      });
   } catch (error) {
      next(error);
   };
};

// Creando un estado del usuario //
const createdStatusController = async(req, res) => {
   try {
      // Obtenemos los datos //
      let {id} = req.user;
      let {name} = req.body;
      // Hacemos el llamado a la funcion que nos crea los estados del usuario //
      await createdStatus({name,id});
      // Respondemos con la pagina de estados //
      res.redirect("/estatus");
   } catch (error) {
      throw new Error(error);
   };
};
// Actualizacion de los estados //
const update = async(req, res) => {
   try {
      // Obtenemos los datos //
      const {id : statusId} = req.params;
      const {name} = req.body;
      // Hacemos el llamado a la funcion que nos actualiza los estados del usuario //
      await updateStatus({name, statusId});
      // Respondemos con la pagina de estados //
      res.redirect('/estatus');
   } catch (error) {
      throw new Error(error);
   };
};

// Eliminacion de una categoria //
const deleteSta = async(req, res) => {
   try {
      // Obtenemos el id del estado a eliminar // 
      let statusId = req.params.id;
      // Hacemso el llamado a la funcion que la elimina //
      await deleteStatus(statusId);
      // Redireccionamos hacia la pagina de estados  //
      return res.redirect('/estatus');
   } catch (error) {
      throw new Error(error);
   };
};

// Exportaciones //
module.exports = {
   renderStatus,
   renderEditStatus,
   createdStatusController,
   update,
   deleteSta
};