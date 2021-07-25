const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: "Your email is required",
    trim: true,
  },
});

module.exports = mongoose.model("Newsletter", NewsletterSchema);
