const Tour = require('../models/tours');

exports.seedTours = () => {
	Tour.create({
		//...req.body
		title: String
	}, (err, tour) => {
		if (err) throw err;
		tour.save((err, savedTour) => {
			if (err) throw err;
			return "Thank you! You're tour info has been saved"
		})
	})
}