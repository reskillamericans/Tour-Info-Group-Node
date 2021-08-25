module.exports = (req, res, next) => {
  redirectUrl = '/auth/login?=redirect?'+ req.originalUrl;
  if (!req.user) return res.redirect(redirectUrl);
  next();
};
