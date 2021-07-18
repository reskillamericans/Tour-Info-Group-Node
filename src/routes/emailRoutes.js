const express = require('express');
const app = express();
const router = express.Router();
const EmailCtrl = require('../controllers/emailController');

// POST route to /text-mail - send confirmation email
app.post('/text-mail', EmailCtrl.sendMail);

module.exports = app;