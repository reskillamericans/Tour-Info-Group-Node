const Booking = require('../models/booking');

exports.store = async (req, res) => {
  // TODO: get user id from url
	// instantiating new booking
	const newBooking = new Booking({...req.body});
	// saving new booking
	const booking_ = await newBooking.save();
	// send confirmation email
  await sendVerificationEmail(booking_, req, res);
}
// TODO: abstract make DRY
async function sendVerificationEmail(booking, req, res) {
  try {
    const token = booking.user.generateVerificationToken();

    // Save the verification token
    await token.save();

    // Verification mail data
    let subject = "Booking Confirmation";
    let to = booking.user.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Hi ${booking.user.username}<p><br><p>Your tour to ${booking.tour} is confirmed.</p> 
		<br><p>If you did not request this, please ignore this email.</p>`;
    await sendMail({to, from, subject, html});

    res.status(200).json({message: 'A confirmation email has been sent to ' + booking.user.email + '.'});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
// create booking()
// set booking attributes
// save booking
// if it saves, send email confirmation
