const express = require('express');
const router = express.Router();
const TourCtrl = require('../controllers/tourController');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const { check } = require('express-validator');

// GET request to /tours to fetch all tours
router.get('/tours', TourCtrl.fetchTours);
// GET request to /tours/ to fetch travelType
router.get("/tours/travelType/:travelType", TourCtrl.fetchTours);
// GET request to /tours to fetch travel category
router.get("/tours/category/:category", TourCtrl.fetchTours);
// GET request to /tours to fetch tour by city
router.get("/tour/city/:city", TourCtrl.fetchTours)
// GET request to /tours/:id to fetch a single tour
router.get('/tours/:id', TourCtrl.fetchSingleTour);
// POST request to /tours/:id/booking to book a tour
router.get('/tours/:id/booking', authenticate, TourCtrl.bookTour);

module.exports = router;
