// authenticateToken.js
const jwt = require('jsonwebtoken');
const User = require('../schema/userSchema');
const cookies = require('js-cookie')
const multer=require('multer')
async function authenticateToken(req, res, next) {
    const token = req.cookies['accesstoken']; 
    console.log(token,"bro");
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);

        req.user =await User.model.findOne({userName:user.userName})
        console.log(req.user,"BRO this one");
        
        next();
    });
}

const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Frontend/public/images');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  return upload = multer({ storage: storage });
}

module.exports = {authenticateToken,uploadFile};
