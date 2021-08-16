const passport = require("passport");

module.exports = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "You need to be logged in." });
  // if (!req.user) return res.status(401).redirect('/login');
  next();
};
