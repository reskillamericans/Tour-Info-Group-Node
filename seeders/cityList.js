const cityList = require('../seeders/cities.json');
const Location = require('../models/location');

exports.seedCities = () => {
	for (var i = 0; i < cityList.length; i++) {
		// check if this city exists
		Location.findOne({name: cityList[i].name}, (err, existingCity) => {
			if (err) throw err;
			if (existingCity) {
				return "Location already exists";
			}
		// if city does not exist, create location
		Location.create({
			title: cityList[i].name,
			type: "city"
		}, (err, newCity) => {
			if (err) {
				console.log(err);
			}
			if (newCity) {
				console.log(newCity);
			}
		})
	})
	}
}
