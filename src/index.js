require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const index = require('./routes/index');
const locationRoutes = require('./routes/locationRoutes');
const emailRoutes = require('./routes/emailRoutes');
const authRoutes = require('./routes/authRoutes');
const passRoutes = require('./routes/passwordRoutes');
const userRoutes = require('./routes/userRoutes');
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
app.use('/', index);
app.use(locationRoutes);
app.use(emailRoutes);
app.use(authRoutes);
app.use(passRoutes);
app.use(userRoutes);

//SEEDERS
const {seedCities} = require('./seeders/citySeeder');
const {seedCountries} = require('./seeders/countrySeeder');

seedCities();
seedCountries();

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
});
