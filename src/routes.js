const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/status', async (req, res) => {
  res.send({ status: 200 })
})

//EVENT ROUTS
routes.post('/event', upload.single("thumbnail"), EventController.createEvent)  

//USER ROUTS                                                                                                                                                                                                                                                        
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes
