const Event = require('../models/Event')

// title: String,
// description: String,
// price: Number,
// thumbnail: String

module.exports = {
  async creatEvent (req, res) {
    const { yitle, description, price } = req.body
    const { userId } = req.headers
    const { fileName } = req.file
    const user = await User.findById(userId)

    if (!user) {
      return res.status(400).json({ message: 'User does not exit!' })
    }

    const event = await Event.create({
      title,
      description,
      price,
      user: userId,
      thumbnail: filename
    })
    return res.json(event)

  }
}
