const Location = require('../models/location');
const superagent = require('superagent');

// fetches all locations
exports.fetchLocations = (req, res) => {
	// search for locations by category
	let conditions = {};
	if (req.query.category) {
		conditions.category = req.query.category;
	}
	Location.find(conditions, (err, locations) => {
		if (err) {
			return res.status(500).json({message: err});
		} else {
			return res.status(200).json({locations});
		}
	})
}

// fetches single location
exports.fetchSingleLocation = (req, res) => {
	// fetches location by _id value
	Location.findOne({_id: req.params.id}, (err, location) => {
		if (err) {
			return res.status(500).json({message: err});
		} else if (!location) {
			return res.status(404).json({message: "location not found"});
		} else {
			return res.status(200).json({location});
		}
	})
}

// update single location
exports.updateSingleLocation = (req, res) => {
	// fetches by _id value and the req.body
	Location.findByIdAndUpdate(req.params.id, {
		location: req.body.location,
		title: req.body.title,
		comments: req.body.comments,
		reviews: req.body.reviews
	}, (err, location) => {
		if (err) {
			return res.status(500).json({message: err});
		} else if (!location) {
			return res.status(404).json({message: "location not found"});
		} else {
			location.save((err, savedLocation) => {
				if (err) {
					return res.status(400).json({message: err});
				} else {
					return res.status(200).json({message: "location updated successfully"})
				}
			});
		}
	})
}