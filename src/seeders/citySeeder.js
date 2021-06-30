const cityList = require('./cities.json');
const Location = require('../models/location');

exports.seedCities = () => {
	const lists = cityList.map(city => {
		return {
			title: city.name,
			type: "city"
		}
	});
	// check if city already exists
	Location.findOne({"title": "city.name"}, (err, existingCity) => {
		if (err) console.log(err);
		if (existingCity) return "Location already exists";
	});
	// if city has no duplicate then create the city
	Location.create(...lists, (err, createdCities) => {
		if (err) {
			console.log(err);
		} else {
			createdCities.save((err, savedCities) => {
				if (err) console.log(err);
				console.log("cities seeded");
			})
		}
	})
}
	// check locations for "type: city"
	// if there are stop function
	// if none then create them