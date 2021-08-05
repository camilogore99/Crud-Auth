
const { users, Category, Task} = require('../models')


// Creamos la funcion 
const getUsers = async() => {
   try {
      let usersE = await users.findAll({include: [{model: Category},{model: Task}]});
      return usersE
   } catch (error) {
      throw new Error(error)
   }
}
module.exports = {
   getUsers
}