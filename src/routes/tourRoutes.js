const express = require('express');
const router = express.Router();
const TourCtrl = require('../controllers/TourController');
const validate = require('../middlewares/validate');
const { check } = require('express-validator');



// GET request to /tours to fetch all tours
router.get('/tours', TourCtrl.fetchTours);
// GET request to /tours/:id to fetch a single tour
router.get('/tours/:id', TourCtrl.fetchSingleTour);
// POST request to /tours/:id/booking to book a tour
router.post('/tours/:id/booking',[
  check('user').not().isEmpty().withMessage('A user is required'),
  check('tour').not().isEmpty().withMessage('A tour is required'),

], validate, TourCtrl.store);

module.exports = router;
