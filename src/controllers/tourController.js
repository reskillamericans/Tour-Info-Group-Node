const Tour = require('../models/tours');
const Booking = require('../models/booking');
const User = require('../models/user');
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
exports.bookTour = async (req, res) => {
	try {
		// Access user by id
		let loggedInUser = await User.findById(req.user, (err, user) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Result : ', user)
			}
		});

		// search for existing tour by id, if no tour exists, create one with logged in user info.
		await Tour.findById(req.body.tour, (err, tour) => {
			if (err) {
				return res.status(404).json({message: 'Tour not found'});
			} else {
				Booking.create({
					user: loggedInUser,
					tour: tour,
					category: req.body.category,
					travelType: req.body.travelType
				}, (err, newBooking) => {
					if (err) {
						return res.status(500).json({ message: err });
					} else {
						if (loggedInUser.Tours) {
							loggedInUser.Tours.push(newBooking.tour);
						} else {
							loggedInUser.Tours = [newBooking.tour];

							loggedInUser.save((err) => {
								if (err) {
									return res.status(500).json({ message: err });
								} else {
									sendConfirmationEmail(newBooking);
									return res.status(200).json({ message: 'Tour booked successfully!', newBooking });
								}
							})
						}
					}
				})
			}
		})
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}

// TODO: abstract make DRY
async function sendConfirmationEmail(bookedTour) {
	try {
		// Access user by id and set email variables
		let userInfo = await User.findById(bookedTour.user, (err, user) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Result : ', user)
			}
		});
		// Access tour by id and set email variables
		let tourInfo = await Tour.findById(bookedTour.tour, (err, tour) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Result : ', tour)
			}
		});

		// Confirmation mail data
		let subject = "Tour Booking Confirmation";
		let to = userInfo.email;
		let from = process.env.FROM_EMAIL;
		let html = `<p>Hi ${userInfo.username}<p><br><p>Your tour to ${tourInfo.title} is confirmed.</p>
		<br><p>If you did not request this, please ignore this email.</p>`;

		await sendMail({to, from, subject, html});
		console.log('Email sent');
	} catch (error) {
		console.log(error);
	}
}

