const express = require('express');
const router = express.Router();
const LocationCtrl = require('../controllers/locationControllers');

// GET request to /locations to fetch all locations
router.get('/locations', LocationCtrl.fetchLocations);
// GET request to /locations/:id to fetch single location
router.get('/locations/:id', LocationCtrl.fetchSingleLocation);
// PUT request to /locations/:id to update single location
router.put('/locations/:id', LocationCtrl.updateSingleLocation);

module.exports = router;