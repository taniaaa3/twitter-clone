const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');
const {uploadProfilePic} = require('../middleware/uploadMiddleware');

// To get user data
router.route('/:id').get(userControllers.getUser);

// To follow a user
router.route('/:id/follow').post(authMiddleware, userControllers.followUser);

// To unfollow a user
router.route('/:id/unfollow').post(authMiddleware, userControllers.unfollowUser);

// Edit User details
router.route('/:id').put(authMiddleware, userControllers.editUser);

// Get User tweets
router.route('/:id/tweets').get(userControllers.getTweets);

// upload user profile picture
router.route('/:id/uploadProfilePic').post(authMiddleware, uploadProfilePic.single("pfp"), userControllers.uploadPFP);

module.exports = router;