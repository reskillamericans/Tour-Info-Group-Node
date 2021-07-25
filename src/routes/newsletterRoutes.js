const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const validate = require("../middlewares/validate");
const { subscribe } = require("../controllers/newsletterController");

router.post("/newsletter", check("email").isEmail().withMessage("Enter a valid email address"), validate, subscribe);

module.exports = router;
