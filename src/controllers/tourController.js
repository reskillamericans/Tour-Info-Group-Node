const Tour = require('../models/tours');

// fetches all tours
exports.fetchTours = (req, res) => {
	// search for tours by ...
	Tour.find((err, tours) => {
		if (err) {
			return res.status(500).json({message: err});
		} else {
			return res.status(200).json({tours})
		}
	})
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
exports.bookTour = (req, res) => {
	Tour.create({
		
	})
}