const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const User = require('../controllers/userController');
const Booking = require('../services/bookTourService');
const validate = require('../middlewares/validate');

// INDEX
router.get('/user', User.index);

// STORE
router.post('/user', [
	check('email').isEmail().withMessage('Enter a valid email address'),
	check('username').not().isEmpty().withMessage('Your username is required'),
	check('firstName').not().isEmpty().withMessage('Your first name is required'),
	check('lastName').not().isEmpty().withMessage('Your last name is required'),
], validate, User.store);

// SHOW
router.get('/user/:id', User.show);

// UPDATE
router.put('/user/id', User.update);

// DELETE
router.delete('/user/:id', User.destroy);

// Book tour
router.post('/user/:id/booking', [
	check('username').not().isEmpty().withMessage('Your username is required'),
	check('tour').not().isEmpty().withMessage('Your last name is required'),
	check('category').not().isEmpty().withMessage('Category is required'),
	check('travelType').not().isEmpty().withMessage('Travel type is required'),

], validate, Booking.store)

module.exports = router;
