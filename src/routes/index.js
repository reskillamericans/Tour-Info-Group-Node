const express = require('express');
const app = express();
const router = express.Router();
const auth = require('./authRoutes');
const user = require('./userRoutes');
const authenticate = require('../middlewares/authenticate');

module.exports = app => {
	app.get('/', (req, res) => {
		res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
	});

	app.use('/api/auth', auth);
	app.use('/api/user', authenticate, user);
};