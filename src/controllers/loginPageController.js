// @route GET api/auth/login
// @desc Render login form
// @access Public
exports.getLoginPage = (req, res) => {
  res.status(200).render('signup');
}
