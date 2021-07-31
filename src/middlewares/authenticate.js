const passport = require("passport");

module.exports = (req, res, next) => {
  // authenticates the users request by specifying the 'jwt' strategy
  passport.authenticate("jwt", function (err, user, info) {
    if (err) return next(err);
    // if unable to authenticate request, an error message is returned
    if (!user) return res.status(401).json({ message: "Unauthorized Access - No Token Provided!" });
    req.user = user;
    next();
  })(req, res, next);
};
