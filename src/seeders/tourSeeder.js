const Tour = require('../models/tours');


exports.seedTours = () => {
	Tour.create({
		title: req.body.title,
		descriptions: req.body.descriptions,
		images: req.body.images,
		featureImage: req.body.featureImage,
		notes: req.body.notes,
		city: req.body.city,
		country: req.body.country,
		category: req.body.category,
		travelType: req.body.travelType
	}, (err, tour) => {
		if (err) throw err;
		tour.save((err, savedTour) => {
			if (err) throw err;
			console.log("tours seeded");
		})
	})
}