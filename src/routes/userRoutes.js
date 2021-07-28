const express = require('express');
const router = express.Router();
const User = require('../controllers/userController');

// INDEX
router.get('/user', User.index);

// SHOW
router.get('/user/:id', User.show);

// UPDATE
router.put('/user/id', User.update);


module.exports = router;
