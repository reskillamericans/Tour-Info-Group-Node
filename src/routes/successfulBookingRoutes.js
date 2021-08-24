const express = require("express");
const router = express.Router();
const BookingCtrl = require('../controllers/successfulBookingController');

// GET request to /booking to fetch successful booking page
router.get('/booking', BookingCtrl.getSuccessfulBookingPage);

module.exports = router;
