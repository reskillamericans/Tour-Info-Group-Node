const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const EmailCtrl = require('../controllers/emailController');
const emailPass = process.env.EMAIL_PASS;
const port = process.env.PORT;

// POST request to send new mail
router.post('/text-mail', EmailCtrl.sendEmail);