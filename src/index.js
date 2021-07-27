require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const index = require("./routes/index");
const locationRoutes = require("./routes/locationRoutes");
const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");
const passRoutes = require("./routes/passwordRoutes");
const userRoutes = require("./routes/userRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const contactRoutes = require("./routes/contactRoutes");
const tourRoutes = require("./routes/tourRoutes");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

//==================================================
// MIDDLEWARE
//==================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//==================================================
// EJS
//==================================================
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get(passRoutes, (req, res) => {
  res.render("reset");
});
//==================================================
// DATABASE
//==================================================
const dbSetup = require("./database/setup");

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
app.use(newsletterRoutes);
app.use(contactRoutes);

//==================================================
// INITIALIZE PASSPORT MIDDLEWARE
//==================================================
app.use(passport.initialize());
require("./middlewares/jwt")(passport);
app.use(tourRoutes);

//==================================================
// SEEDERS
//==================================================
const { seedCities } = require("./seeders/citySeeder");
const { seedCountries } = require("./seeders/countrySeeder");
const { seedTours } = require("./seeders/tourSeeder");

// seedCities();
// seedCountries();
// seedTours();

//==================================================
// SERVER
//==================================================
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
