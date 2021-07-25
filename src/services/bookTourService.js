const Booking = require('../models/booking');
const { sendMail } = require('./emailService');

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
async function sendConfirmationEmail(bookedTour, req, res) {
  try {
    // Confirmation mail data
    let subject = "Tour Booking Confirmation";
    let to = bookedTour.user.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Hi ${bookedTour.user.username}<p><br><p>Your tour to ${bookedTour.tour} is confirmed.</p>
		<br><p>If you did not request this, please ignore this email.</p>`;

    await sendMail({to, from, subject, html});
    res.status(200).json({message: 'An email has been sent to ' + bookedTour.email + '.'});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
