const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, getUserProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);

// New route for getting user profile
router.get('/profile', auth, getUserProfile);

module.exports = router;