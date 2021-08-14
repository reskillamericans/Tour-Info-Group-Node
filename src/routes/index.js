const express = require("express");
const router = express.Router();
const auth = require("./authRoutes");
const user = require("./userRoutes");
const authenticate = require("../middlewares/authenticate");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication." });
});

router.use("/api/auth", auth);
router.use("/api/user", authenticate, user);

module.exports = app;
