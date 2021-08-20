const Newsletter = require("../models/newsletter");
const { sendMail } = require("../services/emailService");

exports.subscribe = async (req, res) => {
  try {
    const existingSub = await Newsletter.findOne({ email: req.body.email });

    if (existingSub)
      return res
        .status(401)
        .json({ message: "The email address you have entered has already subscribed to our newsletter." });

    await Newsletter.create({ email: req.body.email });

    const to = req.body.email;
    const subject = `Tour Info Newsletter`;
    const html = `<p>Thank you for subscribing to our newsletter!</p>`;

    sendMail({ to, subject, html });

    return req.flash(
      'subscribed',
      "Thank you for subscribing to the Touryst Newsletter! Stay tuned for exciting tours!"
    );
    // return res.redirect('/contactus');
  

    // return res.status(200).json({ message: "Subscribed to newsletter." });
  } catch (err) {
    res.status(500).json({ success: false, message: error.message });
  }
};
