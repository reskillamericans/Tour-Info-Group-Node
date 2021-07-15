const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');

// GET route to /admin/user - returns all users
router.get('/admin/user', UserCtrl.index);

// POST route to /user - adds a new user
router.post('/user', UserCtrl.store);

// GET route to /user/{id} - returns a specific user
router.get('/user/{id}', UserCtrl.show);

// PUT route to /user/{id} - update user detiails
router.put('/user/{id}', UserCtrl.update);

// DELETE route to /user/{id} - delete user
router.delete('/user/{id}', UserCtrl.destroy);
module.exports = router;