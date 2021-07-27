const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const User = require('../controllers/userController');
const validate = require('../middlewares/validate');

// INDEX
router.get('/user', User.index);

// SHOW
router.get('/user/:id', User.show);

// UPDATE
router.put('/user/id', User.update);


module.exports = router;
