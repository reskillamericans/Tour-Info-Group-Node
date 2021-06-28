require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const locationRoutes = require('./routes/locationRoutes');

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
// app.get('/', (req, res) => {
//   res.send('Welcome to the Tour Info App');
// });
app.use(locationRoutes);



//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
});
