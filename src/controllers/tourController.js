const Tour = require('../models/tours');

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

// @route POST /tours
// @desc Book a tour
// @access Public
exports.bookTour = (req, res) => {
	//find location or tour
	Tour.find(conditions, (err, tour) => {
		if (err) {
			return res.status(500).json({message: err});
		} else {
			return res.status(200).json(tour);
			tour.save((err, savedLocation) => {
				if (err) {
					return res.status(400).json({message: err});
				} else {
					return res.status(200).json({message: "location updated successfully"})
				}

			//choose location or tour
			//book (save) tour
			//send confirmation email
			})
		}
	})
}
