const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/authController');

// POST request to 'auth/register' to register user
router.post('/auth/register', AuthCtrl.register);

// POST request to 'auth/login' to login user
router.post('/auth/login', AuthCtrl.login);

// GET request to 'verify/:token' to verify token
router.get('/verify/:token', AuthCtrl.verify);

// POST request to '/resend' to resend verification token
router.post('/resend', AuthCtrl.resendToken);

//SEND VERIFICATION FUNCTION


module.exports = router;