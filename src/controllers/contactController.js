const { sendMail } = require("../services/emailService");

exports.sendToAdmin = async (req, res) => {
  try {
    const to = process.env.ADMIN_ADDRESS;
    const subject = `Contact Us`;
    const html = `<p>${req.body.message}</p>`;

    // sendMail({ to, subject, html });

    if (req.body.sendCopy === "true")
      sendMail({ to: req.body.email, subject: "Copy of message sent to Touryst", html });

    // return res.status(200).json({ message: "Email(s) sent." });

    req.flash("emailsent", "Your message has been sent! Thank you for contacting the Touryst team!");
    return res.redirect("/contactus");
  } catch (err) {
    res.status(500).json({ success: false, message: error.message });
  }
};
