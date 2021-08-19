const express = require("express");
const router = express.Router();
const User = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

// INDEX
router.get("/user", User.index);

// PROFILE
router.get("/user/profile",authenticate, User.profile);

// SHOW
router.get("/user/:id", User.show);

// UPDATE
router.put("/user/id", User.update);

module.exports = router;
