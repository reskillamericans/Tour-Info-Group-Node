const Location = require('../models/location');
const superagent = require('superagent');


// fetches all locations
exports.fetchLocations = (req, res) => {
	// search for locations by type
	let conditions = {};
	if (req.query.type) {
		conditions.type = req.query.type;
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
	// fetches location by id value
	Location.findOne({_id: req.params.id}, (err, location) => {
		console.log(location);
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
		title: req.body.title,
		type: req.body.type
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