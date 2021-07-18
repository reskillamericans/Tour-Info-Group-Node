require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const nodemailer = require('nodemailer');
const index = require('./routes/index');
const locationRoutes = require('./routes/locationRoutes');
const emailRoutes = require('./routes/emailRoutes');
const authRoutes = require('./routes/authRoutes');
const passRoutes = require('./routes/passwordRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = process.env.PORT || 3000;

//==================================================
// MIDDLEWARE
//==================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//==================================================
// DATABASE
//==================================================
const dbSetup = require('./database/setup');

dbSetup();

//==================================================
// ROUTES
//==================================================
app.use(index);
app.use(locationRoutes);
app.use(emailRoutes);
app.use(authRoutes);
app.use(passRoutes);
app.use(userRoutes);

//==================================================
// INITIALIZE PASSPORT MIDDLEWARE
//==================================================
app.use(passport.initialize());
require('./middlewares/jwt')(passport);

//==================================================
// SEEDERS
//==================================================
const {seedCities} = require('./seeders/citySeeder');
const {seedCountries} = require('./seeders/countrySeeder');

seedCities();
seedCountries();

//==================================================
// SERVER
//==================================================
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
});
