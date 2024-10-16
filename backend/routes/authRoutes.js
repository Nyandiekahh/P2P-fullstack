const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getAllUsers, 
  getUserProfile, 
  updateUserProfile,
  changePassword
} = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/users', auth, getAllUsers);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);
router.put('/change-password', auth, changePassword);

module.exports = router;