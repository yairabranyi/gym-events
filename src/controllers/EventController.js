const Event = require('../models/Event')
const User = require('../models/User')

module.exports = {
  async createEvent (req, res) {
    const { title, description, price } = req.body
    console.log(req.headers)

    const { user_id } = req.headers
    console.log('User id is:', user_id) 
    const { filename } = req.file
    console.log('Searching id')
    const user = await User.findById(user_id)
    // const user = false

    if (!user) {
      return res.status(400).json({ message: 'User does not exit!' })
    }

    const event = await Event.create({
      title,
      description,
      price: parseFloat(price),
      user: user_id,
      thumbnail: filename 
    })
    return res.json(event)
  }   
}
