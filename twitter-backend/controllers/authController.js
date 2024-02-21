const User = require('../models/userModel');

const register = async(req,res)=>{
    const {name, username, email, password} = req.body;
    if(name && username && email && password){
        const userExists = await User.findOne({$or: [{email},{username}]});
        if(userExists){
            res.status(400).json({msg: "User already exists"})
        }
        else{
        try {
            const userCreated = await User.create({name, username, email, password});
            res.status(200).json({msg: "User created successfully", token: await userCreated.generateToken()});
        } catch (error) {
            res.status(400).json({error})
        }
    }
    }
    else{
        res.status(400).json({msg: "One or more fields empty"})
    }
}
const login = async(req,res)=>{
    const {email, password} = req.body;
    if(email && password){
        const userExists = await User.findOne({email});
        if(userExists){
        const passwordCheck = await userExists.comparePassword(password);
        if(passwordCheck){
            res.status(200).json({msg: "User login successful", token: await userExists.generateToken()})
        }
        else{
            res.status(400).json({msg: "Invalid crredentials"});
        }
    }
        else{
            res.status(400).json({msg: "User doesn't exist"});
        }
    }
    else{
        res.status(400).json({msg: "One or more fields empty"})
    }
}

const user = async(req,res)=>{
    const user = req.user;
    res.status(200).json({user});
}

module.exports = {register, login, user}