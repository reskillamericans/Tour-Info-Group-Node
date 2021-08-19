const express = require("express");
const router = express.Router();
const auth = require("./authRoutes");
const user = require("./userRoutes");
const Index = require("../controllers/indexController");
const authenticate = require("../middlewares/authenticate");

router.get("/", Index.getIndex);
router.use("/api/auth", auth);
router.use("/api/user", authenticate, user);

module.exports = router;
