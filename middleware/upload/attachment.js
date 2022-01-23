const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/attachment'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    },
})

module.exports = multer({storage})