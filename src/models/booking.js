const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour",
  },
  category: String,
  travelType: String,
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
