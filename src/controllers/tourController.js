const Tour = require("../models/tours");
const Booking = require("../models/booking");
const User = require("../models/user");
const { sendMail } = require("../services/emailService");

// fetches all tours
exports.fetchTours = (req, res) => {
  // searches for tours by city or country or travel type
  let conditions = {};
  if (req.query.city) {
    conditions.city = req.query.city;
  } else if (req.query.country) {
    conditions.country = req.query.country;
  } else if (req.query.travelType) {
  	conditions.travelType = req.query.travelType;
	} else if (req.query.category) {
  	conditions.category = req.query.category;
	} else if (req.query.date) {
  	conditions.startDate = req.query.date
	}
  Tour.find(conditions).limit(12).exec( (err, tours) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
			res.render('resultsPage', {tours: tours});
    }
  });
};

// fetches single tour
exports.fetchSingleTour = (req, res) => {
  // fetches tour by id value
  Tour.findOne({ _id: req.params.id }, (err, tour) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!tour) {
      return res.status(404).json({ message: "tour not found" });
    } else {
      return res.status(200).render('largeResultsPage', { tour: tour });
    }
  });
};

// book a tour
exports.bookTour = async (req, res) => {
	try {
		// Access user by id
		let loggedInUser = await User.findById(req.user.id);
		if(!loggedInUser){
			console.log('User was not found');
		}

		// Access tour by id and create new booking
		let tour = await Tour.findById(req.body.tour);
		if(!tour){
			console.log('Tour was not found');
		} else {
			let newBooking = await Booking.create({
				user: loggedInUser,
				tour: tour,
				category: req.body.category,
				travelType: req.body.travelType
			});
			// push new booked tour into users 'bookedTours' array
			loggedInUser.bookedTours.push(newBooking);
			await loggedInUser.save()

			let subject = "Tour Booking Confirmation";
			let to = loggedInUser.email;
			let html = `<p>Hi ${loggedInUser.username}<p><br><p>Your tour to ${tour.title} is confirmed.</p>
		<br><p>If you did not request this, please ignore this email.</p>`;

			await sendMail({to, subject, html});
			return res.status(200).json({message: 'Confirmation email sent'});
		}
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}
