const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { authenticate } = require("passport");
const User = require("../controllers/userController");
const validate = require("../middlewares/validate");

// INDEX
router.get("/user", User.index);

// STORE
router.post(
  "/user",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("username").not().isEmpty().withMessage("Your username is required"),
    check("firstName").not().isEmpty().withMessage("Your first name is required"),
    check("lastName").not().isEmpty().withMessage("Your last name is required"),
  ],
  validate,
  User.store
);

// SHOW
router.get("/user/:id", User.show);

// UPDATE
router.put("/user/id", User.update);

// DELETE
router.delete("/user/:id", User.destroy);

router.get("/user/profile", authenticate, profile);

module.exports = router;
