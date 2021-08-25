const express = require('express');
const { check } = require('express-validator');
const Auth = require('../controllers/authController');
const Password = require('../controllers/passwordController');
const validate = require('../middlewares/validate');
const router = express.Router();

// POST request to '/register' to validate all inputs during registration and login to then register user
router.post('/auth/register', [
	check('email').isEmail().withMessage('Enter a valid email address'),
	check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 characters long'),
	check('firstName').not().isEmpty().withMessage('Your first name is required'),
	check('lastName').not().isEmpty().withMessage('Your last name is required')
], validate, Auth.register);

// GET request to '/auth/login' to render login page
router.get('/auth/login', Auth.getLoginPage);

// POST request to '/login' to to validate email and password inputs during registration and login to then register user
router.post('/auth/login', [
	check('username').not().isEmpty(),
	check('password').not().isEmpty(),
], validate, Auth.login);

// GET request to '/verify/:token' to verify email
router.get('/auth/verify/:token', Auth.verify);

// POST request to '/recover' to reset the password
router.post('/auth/recover', [
	check('email').isEmail().withMessage('Enter a valid email address'),
], validate, Password.recover);

// GET request to '/reset/:token' to obtain and validate the reset the token
router.get('/auth/reset/:token', (req, res) => {
	res.status(200).render("reset");
}, Password.reset);

// POST request to '/reset/:token' to validate password requirements and set password
router.post('/auth/reset/:token', [
	check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
	check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
], validate, Password.resetPassword);

module.exports = router;
