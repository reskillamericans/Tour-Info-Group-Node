const Booking = require('../models/booking');

exports.store = async (req, res) => {
  // TODO: get user id from url
	// instantiating new booking
	const newBooking = new Booking({...req.body});
	// saving new booking
	const bookedTour = await newBooking.save();
	// send confirmation email
  await sendConfirmationEmail(bookedTour, req, res);
}

// TODO: abstract make DRY
async function sendConfirmationEmail(booking, req, res) {
  try {
    // const token = booking.user.generateVerificationToken();

    // Save the verification token
    // await token.save();

    // Confirmation mail data
    let subject = "Tour Booking Confirmation";
    let to = booking.user.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Hi ${booking.user.username}<p><br><p>Your tour to ${booking.tour} is confirmed.</p> 
		<br><p>If you did not request this, please ignore this email.</p>`;
    await sendMail({to, from, subject, html});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
