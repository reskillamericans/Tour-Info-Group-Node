require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const locationRoutes = require('./routes/locationRoutes');
const index = require('./routes/index');
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
app.use(locationRoutes);
app.use(emailRoutes);
app.use('/', index);


//SEEDERS
const {seedCities} = require('./seeders/citySeeder');
const {seedCountries} = require('./seeders/countrySeeder');

seedCities();
seedCountries();

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
});
