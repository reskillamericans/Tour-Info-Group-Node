const express = require('express');
const app = express();
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: 'rickmayatest@gmail.com',
    pass: 'ChappedLips!234'
  },
  secure: true
});

app.post('/text-mail', (req, res) => {
  const { to, subject, text } = req.body;
  const mailData = {
    from: 'rickmayatest@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail sent", message_id: info.messageId });
  });
});

module.exports = router;