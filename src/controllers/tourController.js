const Tour = require('../models/tours');
const Booking = require('../models/booking');
const { sendMail } = require('../services/emailService');

// fetches all tours
exports.fetchTours = (req, res) => {
	// searches for tours by city or country
	let conditions = {};
	if (req.query.city) {
		conditions.city = req.query.city;
	} else if (req.query.country) {
		conditions.country = req.query.country;
	}
	Tour.find(conditions, (err, tours) => {
		if (err) {
			return res.status(500).json({message: err});
		} else {
			return res.status(200).json({tours})
		}
	});
}

// fetches single tour
exports.fetchSingleTour = (req, res) => {
	// fetches tour by id value
	Tour.findOne({_id: req.params.id}, (err, tour) => {
		if (err) {
			return res.status(500).json({message: err});
		} else if (!tour) {
			return res.status(404).json({message: "tour not found"});
		} else {
			return res.status(200).json({tour});
		}
	})
}

// book a tour
exports.store = async (req, res) => {
	// TODO: get user id from url
	// instantiating new booking
	const newBooking = new Booking({...req.body});
	// saving new booking
	const bookedTour = await newBooking.save();
	console.log(bookedTour);
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
		res.status(200).json({message: 'An email has been sent to ' + bookedTour.user.email + '.'});
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

