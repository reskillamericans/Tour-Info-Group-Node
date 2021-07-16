const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const User = require('../controllers/userController');
const validate = require('../middlewares/validate');

// INDEX
router.get('/', User.index);

// STORE
router.post('/', [
	check('email').isEmail().withMessage('Enter a valid email address'),
	check('username').not().isEmpty().withMessage('Your username is required'),
	check('firstName').not().isEmpty().withMessage('Your first name is required'),
	check('lastName').not().isEmpty().withMessage('Your last name is required'),
], validate, User.store);

// SHOW
router.get('/:id', User.show);

// UPDATE
router.put('/id', User.update);

// DELETE
router.delete('/:id', User.destroy);

module.exports = router;