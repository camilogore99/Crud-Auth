
const { getUsers } = require('../services/user.service');

const getAll = async(req, res, next) => {
   try {
      let users = await getUsers();
      res.json(users);
   } catch (error) {
      next(error);
   };
};

module.exports = {
   getAll
};