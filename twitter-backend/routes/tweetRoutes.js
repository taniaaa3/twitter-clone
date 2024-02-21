const express = require('express');
const router = express.Router();
const tweetControllers = require('../controllers/tweetControllers');
const authMiddleware = require('../middleware/authMiddleware');
const {uploadTweet} = require('../middleware/tweetMiddleware');

// Create tweet
router.route('/').post(authMiddleware, uploadTweet.single('tweet'), tweetControllers.tweet);

// like a tweet
router.route('/:id/like').post(authMiddleware, tweetControllers.likeTweet);

// dislike a tweet
router.route('/:id/dislike').post(authMiddleware, tweetControllers.dislikeTweet);

// reply on a tweet 
router.route('/:id/reply').post(authMiddleware, tweetControllers.replies);

// delete a tweet
router.route('/:id').delete(authMiddleware, tweetControllers.deleteTweet);

// retweet 
router.route('/:id/retweet').post(authMiddleware, tweetControllers.retweet);

// get single tweet details
router.route('/:id').get(tweetControllers.getSingleTweet);

// get all tweets 
router.route('/').get(tweetControllers.getAllTweets);

module.exports = router;