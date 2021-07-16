const express = require('express');
const { check } = require('express-validator');
const AuthCtrl = require('../controllers/authController');
const PassCtrl = require('../controllers/passwordController');
const validate = require('../middlewares/validate');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

// POST request to '/register' to validate all inputs during registration and login to then register user
router.post('/register', [
	check('email').isEmail().withMessage('Enter a valid email address'),
	check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 characters long'),
	check('firstName').not().isEmpty().withMessage('Your first name is required'),
	check('lastName').not().isEmpty().withMessage('Your last name is required')
], validate, AuthCtrl.register);

// POST request to '/login' to to validate email and password inputs during registration and login to then register user
router.post('/login', [
	check('email').isEmail().withMessage('Enter a valid email address'),
	check('password').not().isEmpty(),
], validate, AuthCtrl.login);

// GET request to '/verify/:token' to verify email
router.get('/verify/:token', AuthCtrl.verify);

// POST request to '/recover' to reset the password
router.post('/recover', [
	check('email').isEmail().withMessage('Enter a valid email address'),
], validate, PassCtrl.recover);

// GET request to '/reset/:token' to obtain and validate the reset the token
router.get('/reset/:token', PassCtrl.reset);

// POST request to '/reset/:token' to validate password requirements and set password
router.post('/reset/:token', [
	check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
	check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
], validate, PassCtrl.resetPassword);

module.exports = router;