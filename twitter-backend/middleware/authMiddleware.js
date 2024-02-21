const jwt = require('jsonwebtoken');
const JWTSECRETKEY = process.env.JWTSECRETKEY
const User = require('../models/userModel');

const authMiddleware = async(req,res,next)=>{
    try {
        const token = req.header('Authorization');
        const JWTtoken = token.replace('Bearer','').trim();
        const userData = jwt.verify(JWTtoken,JWTSECRETKEY);
        const user = await User.findOne({email: userData.email},{password: 0});
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({msg: "Invalid token", error});
    }
}

module.exports = authMiddleware;