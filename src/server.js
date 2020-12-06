const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8000

// const dotenv = require('dotenv')
// dotenv.config()

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

app.use(cors())
app.use(express.json())

//Connect to db
// The following mongoose.set solves deprication worning problems
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

try {
  mongoose.connect(process.env.MONGODBCONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('Connected to DB!')
} catch (error) {
  console.log(error)
}

app.use("/files", express.static(path.resolve(__dirname, "..", "files")))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
