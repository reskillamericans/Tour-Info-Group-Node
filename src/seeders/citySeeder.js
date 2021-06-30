const cityList = require('./cities.json');
const Location = require('../models/location');

exports.seedCities = () => {
	const lists = cityList.map(city => {
		return {
			title: city.name,
			type: "city"
		}
	});
	Location.create(...lists, (err, createdCities) => {
		if (err) {
			console.log(err);
		} else {
			console.log("seeded cities");
			return createdCities;
		}
	})


	// check locations for "type: city"
	// if there are stop function
	// if none then create them


	// for (var i = 0; i < cityList.length; i++) {
	// 	// check if this city exists
	// 	Location.findOne({name: cityList[i].name}, (err, existingCity) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		if (existingCity) {
	// 			return "Location already exists";
	// 		}
	// 	// if city does not exist, create location
	// 	console.log(cityList[i]);
	// 	Location.create({
	// 		title: cityList[i].name,
	// 		type: "city"
	// 	}, (err, newCity) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		if (newCity) {
	// 			newCity.save((err, savedCity) => {
	// 				if (err) console.log(err);
	// 				return "Location saved";
	// 			});
	// 		}
	// 	})
	// })
	// }
}