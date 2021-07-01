const cityList = require('./cities.json');
const Location = require('../models/location');

exports.seedCities = () => {
	// filter out duplicate cities
	const lists = cityList.filter((city, index) => cityList.indexOf(city) === index).map(city => {
		return {
			title: city.name,
			type: "city"
		}
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