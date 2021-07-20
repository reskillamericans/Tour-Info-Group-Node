const express = require('express');
const router = express.Router();
const TourCtrl = require('../controllers/TourController');

// GET request to /tours to fetch all tours
router.get('/tours', TourCtrl.fetchTours);
// GET request to /Fetch single tour
router.get('/tours/:id', TourCtrl.fetchSingleTour);
// POST request to book a new tour
router.post('/tours', TourCtrl.bookTour);

module.exports = router;