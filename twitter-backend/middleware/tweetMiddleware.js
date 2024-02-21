const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"../twitter-frontend/public/tweets")
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadTweet = multer({storage});

module.exports = {uploadTweet};