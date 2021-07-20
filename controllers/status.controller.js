const { 
   createdStatus,
   getStatusByUser,
   statusByiD,
   updateStatus,
   deleteStatus
} = require("../services/status.service");


const renderEditStatus = async( req, res ) => {
   try {
      const {firstname, lastname} = req.user;
      let {id} = req.params;
      const username = `${firstname} ${lastname}`
      const statusName = await statusByiD(id); 
      return res.render("pages/edit-status",{
         title:"editar estado",
         id,
         username,
         name: statusName.status_name
      })
   } catch (error) {
      throw new Error(error)
   }
} 

const renderStatus = async( req, res, next ) => {
   const {id, firstname, lastname} = req.user;
   const status = await getStatusByUser(id);
   try {
      const username = `${firstname} ${lastname}`
      return res.render("pages/status",{
         title:"estados",
         username,
         status
      });
   } catch (error) {
      next(error)
   }
}

const createdStatusController = async(req, res) => {
   try {
      let {id} = req.user;
      let {name} = req.body;
      await createdStatus({name,id})
      res.redirect("/estatus")
   } catch (error) {
      throw new Error(error)
   }
}

const update = async(req, res) => {
   try {
      const {id : statusId} = req.params;
      const {name} = req.body;
      await updateStatus({name, statusId});
      res.redirect('/estatus')
   } catch (error) {
      throw new Error(error);
   }
}
const deleteSta = async(req, res) => {
   try {
      let statusId = req.params.id;
      await deleteStatus(statusId);
      return res.redirect('/estatus')
   } catch (error) {
      throw new Error(error);
   }
} 


module.exports = {
   renderStatus,
   renderEditStatus,
   createdStatusController,
   update,
   deleteSta
}