const Tour = require('../models/tours');


exports.seedTours = () => {
	Tour.create((err, createdTours) => {
		if (err) {
			console.log(err);
		} else {
			createdTours.save((err, savedTours) => {
				if (err) console.log(err);
				console.log("tours seeded");
			});
		}
	});
}