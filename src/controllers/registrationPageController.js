exports.renderRegistrationPage = async (req, res) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
