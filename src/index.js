require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const locationRoutes = require('./routes/locationRoutes');
const emailRoutes = require('./routes/emailRoutes');
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//==================================================
// DATABASE
//==================================================
const dbSetup = require('./database/setup');

dbSetup();

//==================================================
// Routes
//==================================================

//Placeholder routes for webpages
app.get('/', (req, res) => {
  res.send('Welcome to the Tour Info App');
});
app.use(locationRoutes);

//==================================================
// Nodemailer
//==================================================
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

//SEEDERS
const {seedCities} = require('./seeders/citySeeder');
const {seedCountries} = require('./seeders/countrySeeder');

seedCities();
seedCountries();

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
});
