const express = require("express");
const router = express.Router();

const AboutUs = require("../controllers/aboutController");

router.get('/about', AboutUs.renderAboutUs);

module.exports = router;