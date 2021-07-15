const express = require('express');
const router = express.Router();
const PassCtrl = require('../controllers/passwordController');

// POST route to /auth/recover - Generates token and Sends password reset email
router.post('/auth/recover', PassCtrl.recover);

// POST route to /auth/reset - Validate password reset token and show the password reset view
router.post('/auth/reset', PassCtrl.reset);

// POST route to /auth/reset - Reset Password
router.post('/auth/reset', PassCtrl.resetPassword);

module.exports = router;