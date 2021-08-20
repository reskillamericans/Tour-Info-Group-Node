const express = require("express");
const router = express.Router();

const ContactUs = require("../controllers/contactPageController");

router.get('/contactus', ContactUs.renderContactUs);

module.exports = router;