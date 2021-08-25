const Tour = require("../models/tours");
const Booking = require("../models/booking");
const User = require("../models/user");
const { sendMail } = require("../services/emailService");

// fetches all tours
exports.fetchTours = (req, res) => {
  // creates conditions for req queries
  let conditions = {};
  if (req.query.city) {
    conditions.city = req.query.city;
  }
  if (req.query.country) {
    conditions.country = req.query.country;
  }
  if (req.query.travelType) {
  	conditions.travelType = req.query.travelType;
	}
  if (req.query.category) {
  	conditions.category = req.query.category;
	}
  if (req.query.startDate) {
  	conditions.date = {$gte: req.query.startDate};
	}
  if (req.query.endDate) {
		if (conditions.date) {
			conditions.date.$lte = req.query.endDate;
		} else {
			conditions.date = {$lte: req.query.endDate};
		}
	}
  if (req.query.destination) {
  	conditions.$or = [{city: new RegExp(req.query.destination, 'i') }, {country: new RegExp(req.query.destination, 'i')}];
	}
	if (req.query.numOfTravelers) {
		conditions.numOfTravelers = req.query.numOfTravelers;
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
		let tour = await Tour.findById(req.params.id);
		if(!tour){
			console.log('Tour was not found');
		} else {
			let newBooking = await Booking.create({
				user: loggedInUser,
				tour: tour,
				category: tour.category,
				travelType: tour.travelType
			});
			// push new booked tour into users 'bookedTours' array
			loggedInUser.bookedTours.push(newBooking);
			await loggedInUser.save()

			let subject = "Tour Booking Confirmation";
			let to = loggedInUser.email;
			let html = `<p>Hi ${loggedInUser.username}<p><br><p>Your tour to ${tour.title} is confirmed.</p>
		<br><p>If you did not request this, please ignore this email.</p>`;

			// await sendMail({to, subject, html});
			return res.status(200).render('successfulBooking', {currentUser: loggedInUser});
		}
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}
