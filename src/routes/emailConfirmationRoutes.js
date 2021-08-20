const express = require("express");
const router = express.Router();

const EmailConfirmation = require("../controllers/emailConfirmationController");

router.get('/emailsent', EmailConfirmation.renderEmailConfirmation);

module.exports = router;