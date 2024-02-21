const Tweet = require('../models/tweetModel');
const {uploadTweet} = require('../middleware/tweetMiddleware');

// to tweet
const tweet = async(req,res)=>{
    const user = req.user;
    const {content} = req.body;
    try {
        if(content && req.file){
            const createTweet = await Tweet.create({content, tweetedBy: user._id, image: req.file.filename})
            res.status(200).json({createTweet});
        }
        else if(content){
            const createTweet = await Tweet.create({content, tweetedBy: user._id, image: ""})
            res.status(200).json({createTweet});
        }
        else{
            res.status(400).json({msg: "Content shouldn't be empty"})
        }
    } catch (error) {
        res.status(400).json({error: "here"})
    }
}

// to like a tweet
const likeTweet = async(req,res)=>{
    const {id} = req.params
    const user = req.user;
    try {
        const likeExists = await Tweet.findOne({_id: id, likes: user._id});
        if(likeExists){
            res.status(400).json({msg: "Cannot like already liked tweet"})
        }
        else{
            const like = await Tweet.findOneAndUpdate({_id: id},{$push: {likes: user._id}})
            res.status(200).json({msg: "Tweet liked!", like})
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

// to dislike a tweet
const dislikeTweet = async(req,res)=>{
    const {id} = req.params;
    const user = req.user;
    try {
        const likeExists = await Tweet.findOne({_id: id, likes: user._id});
        if(likeExists){
            const dislike = await Tweet.findOneAndUpdate({_id: id}, {$pull: {likes: user._id}});
            res.status(200).json({msg: "Tweet Disliked!", dislike})
        }
        else{
            res.status(400).json({msg: "Cannot dislike tweet"})
        }
    } catch (error) {
        res.status(400).json({error});
    }
}

// to reply on a tweet
const replies = async(req,res)=>{
    const {content} = req.body;
    const {id} = req.params;
    const user = req.user;
    try {
            const tweetCreated = await Tweet.create({content, tweetedBy: user._id, image: ""});
            const reply = await Tweet.findOneAndUpdate({_id: id}, {$push: {replies: tweetCreated._id}});
            res.status(200).json({msg: "Commented", reply});
    } catch (error) {
        res.status(400).json({error});
    }

}

// delete a tweet
const deleteTweet = async(req,res)=>{
    const {id} = req.params;
    const user = req.user;
    const tweet = await Tweet.findOne({_id: id});
    try {
        if(tweet.tweetedBy.toString() == user._id){
            const delTweet = await Tweet.findOneAndDelete({_id: id});
            tweet.replies.forEach(async (element) => {
                const delComment = await Tweet.findOneAndDelete({_id: element});
            });
            res.status(200).json({msg: "Tweet deleted!", delTweet});
        }
        else{
            res.status(400).json({msg: "You cannot delete this tweet."})
        }
    } catch (error) {
        res.status(400).json({error});
    }
}

// retweet
const retweet = async(req,res)=>{
    const user = req.user;
    const {id} = req.params;
    try {
        const retweetExists = await Tweet.findOne({_id: id, retweetBy: user._id});
        if(retweetExists){
            res.status(400).json({msg: "Cannot Retweet twice!"})
        }
        else{
            const retweet = await Tweet.findOneAndUpdate({_id: id},{$push: {retweetBy: user._id}})
            res.status(200).json({msg: "Tweet Retweeted!"})
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

// get all tweets
const getAllTweets = async(req,res)=>{
    try {
        const tweets = await Tweet.find().populate("retweetBy",'-password').populate('likes','-password').populate('tweetedBy','-password').populate('replies','-password');
        res.status(200).json({tweets: tweets.reverse()});
    } catch (error) {
        res.status(400).json({error});
    }
}

// get single tweet
const getSingleTweet = async(req,res)=>{
    const {id} = req.params;
    try {
        const tweetDetails = await Tweet.findOne({_id: id},{password: 0}).populate("retweetBy",'-password').populate('likes','-password').populate('tweetedBy','-password').populate('replies','-password').populate({path: 'replies',populate: "tweetedBy"});
        res.status(200).json({tweetDetails});
    } catch (error) {
        res.status(400).json({error});
    }
}

module.exports = {tweet, likeTweet, dislikeTweet, getAllTweets, deleteTweet, retweet, replies, getSingleTweet}