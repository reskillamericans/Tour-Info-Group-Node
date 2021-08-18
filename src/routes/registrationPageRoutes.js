const express = require("express");
const router = express.Router();
const { renderRegistrationPage } = require("../controllers/registrationPageController");

router.get("/register", renderRegistrationPage);

module.exports = router;
