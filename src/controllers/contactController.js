const { sendMail } = require("./emailController");

exports.sendToAdmin = async (req, res) => {
  try {
    const to = process.env.ADMIN_ADDRESS;
    const subject = `Contact Us`;
    const text = req.body.message;

    sendMail({ to, subject, text });

    if (req.body.sendCopy === "true")
      sendMail({ to: req.body.email, subject: "Copy of message sent to Touryst", text });

    return res.status(200).json({ message: "Email(s) sent." });
  } catch (err) {
    res.status(500).json({ success: false, message: error.message });
  }
};
