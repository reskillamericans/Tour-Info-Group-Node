const Tour = require('../models/tours');
const toursList = require('./tours.json');

exports.seedTours = () => {
	// let conditions = {};
	// if (req.query.city) {
	// 	conditions.city = req.query.city;
	// } else if (req.query.country) {
	// 	conditions.country = req.query.country;
	// }
	// Tour.find(conditions, (err, tours) => {
	// 	if (err) {
	// 		return res.status(500).json({message: err});
	// 	} else {
	// 		return res.status(200).json({tours});
	// 	}
	// });
	Tour.find({}, (err, tour) => {
		if (err) {
			console.log(err);
		} else {
			if (!tour.length) {
				Tour.create(toursList, (err, createdTours) => {
		if (err) {
			console.log(err);
		} else {
			console.log("tours seeded");
		}
	});
			} else {
				console.log('tours have been seeded');
			}
		}
	})

	
}