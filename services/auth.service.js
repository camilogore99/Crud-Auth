const Users = require('../models')

const newUser = async({ firstname, lastname, email, password }) => {
   try {
      let user = await Users.create({ firstname, lastname, email, password });
      return user
   } catch (error) {
      throw new Error(error)
   }
}

module.exports = {
   newUser
}