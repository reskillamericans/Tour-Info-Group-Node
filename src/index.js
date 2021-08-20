require("dotenv").config();
const express = require("express");
const cors = require("cors");
const flash = require("connect-flash"); //added flash here - DOUBLE CHECK
const index = require("./routes/index");
const locationRoutes = require("./routes/locationRoutes");
const loginPageRoutes = require("./routes/loginPageRoute");
const authRoutes = require("./routes/authRoutes");
const passRoutes = require("./routes/passwordRoutes");
const userRoutes = require("./routes/userRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const contactRoutes = require("./routes/contactRoutes");
const tourRoutes = require("./routes/tourRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const contactPageRoutes = require("./routes/contactPageRoutes");

const registrationPageRoutes = require("./routes/registrationPageRoutes");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const SECRET = process.env.SECRET;
//==================================================
// MIDDLEWARE
//==================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
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
// INITIALIZE PASSPORT MIDDLEWARE
//==================================================

const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");

app.use(
  require("express-session")({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    expires: new Date(Date.now() + 30 * 80000 * 1000),
    cookie: {
      maxAge: 30 * 80000 * 1000,
    },
  })
  );
  app.use(flash());             ////added flash here - DOUBLE CHECK
  app.use(function (req, res, next) {
    console.log(req.user);
    res.locals.currentUser = req.user;
    res.locals.emailsent = req.flash ('emailsent')
    res.locals.subscribed = req.flash ('subscribed')
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use("local", new LocalStrategy(User.authenticate()));



  //==================================================
  // ROUTES
  //==================================================
  app.use(index);
  app.use(locationRoutes);
  app.use(loginPageRoutes);
  app.use(authRoutes);
  app.use(passRoutes);
  app.use(userRoutes);
  app.use(newsletterRoutes);
  app.use(contactRoutes);
  app.use(tourRoutes);
  app.use(aboutRoutes);
  app.use(contactPageRoutes);
  // app.use(renderEmailConfirmation);
  app.use(registrationPageRoutes);

  //==================================================
  // SEEDERS
  //==================================================
  const { seedCities } = require("./seeders/citySeeder");
  const { seedCountries } = require("./seeders/countrySeeder");
  const { seedTours } = require("./seeders/tourSeeder");
  // const { renderEmailConfirmation } = require("./controllers/emailConfirmationController");

  seedCities();
  seedCountries();
  seedTours();

  //==================================================
  // SERVER
  //==================================================
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });


  // // //////////
   // app.get('/contactus', (req, res) => {
   // res.render('contact', { message: req.flash('info')});

   // });
   // app.get('/about', (req, res) => {
   //   req.flash('info', 'test');
   //   res.redirect('/contactus')

   //   });

   //   app.get('/contact', (req, res) => {
   //     res.send(req.flash('message'));
   //   });
