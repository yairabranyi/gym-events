const multer = require('multer')
const path = require('path')

//MULTER LIBRARY HANDELS FILE MANAGEMENT
module.exports = {
  //DEFINING THE FILES STORAGE LOCATION
  storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'files'),
    //CREATING A FILE NAME
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = path.basename(file.originalname, ext)

      cb(null, `${name.replace(/\s/g, '')}-${Date.now()}${ext}`)
    }
  })
}
  