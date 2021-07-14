const express = require('express');
const app = express();
const router = express.Router();
const EmailCtrl = require('../controllers/emailController');

app.post('/text-mail', EmailCtrl.sendMail);

module.exports = app;