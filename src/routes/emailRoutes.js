const express = require('express');
const app = express();
const EmailCtrl = require('../services/emailService');

// POST route to /text-mail - send confirmation email
app.post('/text-mail', EmailCtrl.sendMail);

module.exports = app;
