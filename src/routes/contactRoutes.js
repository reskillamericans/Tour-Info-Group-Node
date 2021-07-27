const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const validate = require("../middlewares/validate");
const { sendToAdmin } = require("../controllers/contactController");

router.post(
  "/contact",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("name").not().isEmpty().withMessage("Your name is required"),
    check("message").not().isEmpty().withMessage("Your message is required"),
  ],
  validate,
  sendToAdmin
);

module.exports = router;
