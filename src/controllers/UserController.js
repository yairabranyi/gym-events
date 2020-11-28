const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
  async createUser (req, res) {
    try {
      const { firstName, lastName, password, email } = req.body
      console.log('Creating user')

      // Cheack if User exist
      const userExist = await User.findOne({ email })

      //Create A new User (if not exist)
      if (!userExist) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword
        })
        return res.json(user)
      }

      return res.status(400).json({
        message: 'email/user alraedy exsist! Do you want to log in instead?'
      })
    } catch (error) {
      throw Error(`Error while traing to create new user: ${error}`)
    }
  },

  async getUserById (req, res) {
    const { userId } = req.params
    console.log('ENTER getUserById', userId)

    try {
      const user = await User.findById(userId)
      return res.json(user)
    } catch (error) {
      return res.status(400).json({
        message: 'User id dosent exist, Doyou want to register insteat?'
      })
    }
  }
}
