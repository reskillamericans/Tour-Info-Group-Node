const countryList = require('./countries.json');
const Location = require('../models/location');

exports.seedCountries = () => {
	// filter out duplicate cities
	const lists = countryList.filter((country, index) => countryList.indexOf(country) === index).map(country => {
		return {
			title: country.name,
			type: "country"
		}
	});
	// if country has no duplicate then create the country
	Location.create(...lists, (err, createdCountries) => {
		if (err) {
			console.log(err);
		} else {
			createdCountries.save((err, savedCountries) => {
				if (err) console.log(err);
				console.log("countries seeded");
			})
		}
	})
	// const lists = countryList.map(country => {
	// 	return {
	// 		title: country.name,
	// 		type: "country"
	// 	}
	// });
	// // check if country already exists
	// Location.findOne({"title": "country.name"}, (err, existingCountry) => {
	// 	if (err) console.log(err);
	// 	if (existingCountry) return "Location already exists";
	// })
	// // if country has no duplicates then create the country
	// Location.create(...lists, (err, createdCountries) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		createdCountries.save((err, savedCountries) => {
	// 			if (err) console.log(err);
	// 			console.log("countries seeded");
	// 		})
	// 	}
	// })
}