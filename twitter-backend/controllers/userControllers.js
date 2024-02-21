const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');

// To get user data
const getUser = async(req,res)=>{
    const {id} = req.params;
    try {
        const user = await User.findOne({_id: id}, {password: 0}).populate('following','-password').populate('followers','-password').exec();
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({error})
    }
}

// To follow a user
const followUser = async(req,res)=>{
    const {id} = req.params;
    const user = req.user;
    const followerExists = await User.findOne({followers: user._id});
    const followingExists = await User.findOne({following: id});
    try {
        if(user._id == id){
            res.status(400).json({msg: "You cannot follow yourself"});
        }
        else{
        if(followerExists || followingExists){
            res.status(400).json({msg: "User already followed"});
        }
        else{
            const follow = await User.findOneAndUpdate({_id: id},{$push: {followers: user._id}});
            const following = await User.findOneAndUpdate({_id: user._id}, {$push: {following: id}});
            res.status(200).json({msg: "User Followed", follow, following});
        }}
    } catch (error) {
        res.status(400).json({error});
    }
}

// To unfollow a user
const unfollowUser = async(req,res)=>{
    const {id} = req.params;
    const user = req.user;
    const followerExists = await User.findOne({followers: user._id});
    const followingExists = await User.findOne({following: id});
    try {
        if(user._id == id){
            res.status(400).json({msg: "You cannot unfollow yourself"});
        }
        else{
        if(followerExists || followingExists){
        const unfollow = await User.findOneAndUpdate({_id: user._id},{$pull : {following: id}});
        const unfollowed = await User.findOneAndUpdate({_id: id}, {$pull: {followers: user._id}});
        res.status(200).json({msg: "User Unfollowed", unfollow, unfollowed});}
        else{
            res.status(400).json({msg: "User not followed"});
        }}
    } catch (error) {
        res.status(400).json({error});
    }
}

// Edit user details
const editUser = async(req,res)=>{
    const {name, dob, location} = req.body;
    const {id} = req.params;
    const user = req.user;
    if(user._id == id){
        try {
            if(name && dob && location){
                const updatedUser = await User.findOneAndUpdate({_id: id},{name, dob, location})
                res.status(200).json({updatedUser});
            }
            else if(name && !dob && location){
                const updatedUser = await User.findOneAndUpdate({_id: id},{name, location})
                res.status(200).json({updatedUser});
            }
            else if(name && !dob && !location){
                const updatedUser = await User.findOneAndUpdate({_id: id},{name})
                res.status(200).json({updatedUser});
            }
            else if(name && dob && !location){
                const updatedUser = await User.findOneAndUpdate({_id: id},{name, dob})
                res.status(200).json({updatedUser});
            }
            else{
                res.status(400).json({msg: "Name cannot be empty"});
            }
        } catch (error) {
            res.status(400).json({error});
        }
    }
    else{
        res.status(400).json({msg: "You cannot edit others user details"})
    }
}

// get user tweets
const getTweets = async(req,res)=>{
    const {id} = req.params;
    try {
        const tweets = await Tweet.find({tweetedBy: id}).populate("tweetedBy","-password");
        res.status(200).json({tweets: tweets.reverse()})
    } catch (error) {
        res.status(400).json({error})
    }
}

// Set Profile Pic
const uploadPFP = async(req,res)=>{
    const {id} = req.params;
    try {
            const updatePFP = await User.findOneAndUpdate({_id: id},{profilePicture: req.file.filename}) 
            res.status(200).json({updatePFP});
    } catch (error) {
        res.status(400).json({error});
    }
}

module.exports = {getUser, followUser, unfollowUser, editUser, getTweets, uploadPFP};