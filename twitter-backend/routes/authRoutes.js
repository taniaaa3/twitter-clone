const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// to register a user
router.route('/register').post(authControllers.register);

// to login
router.route('/login').post(authControllers.login);

// to get logged in user info
router.route('/user').get(authMiddleware, authControllers.user);

module.exports = router;