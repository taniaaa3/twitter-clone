const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"../twitter-frontend/public/profilePics")
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadProfilePic = multer({storage});

module.exports = {uploadProfilePic};