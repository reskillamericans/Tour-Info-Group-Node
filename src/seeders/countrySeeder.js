const countryList = require('./countries.json');
const Location = require('../models/location');

exports.seedCountries = () => {
	const lists = countryList.map(country => {
		return {
			title: country.name,
			type: "country"
		}
	});
	// if country has no duplicates then create the country
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


	// lists.forEach(country => {
	// 	Location.create(country, (err, createdCountry) => {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			console.log("seeded countries");
	// 			return createdCountry;
	// 		}
	// 	});
	// })

	// check for duplicates for countries and cities


	// Location.create(...lists, (err, createdCountries) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log("created countries");
	// 	}
	// })


	// for (var i = 0; i < countryList; i++) {
	// 	// check if this country exists
	// 	Location.findOne({name: countryList[i].name}, (err, existingCountry) => {
	// 		if (err) throw err;
	// 		if (existingCountry) {
	// 			return "Location already exists";
	// 		}
	// 		// if country does not exist, create location
	// 		Location.create({
	// 			title: countryList[i].name,
	// 			type: "country"
	// 		}, (err, newCountry) => {
	// 			if (err) {
	// 				console.log(err);
	// 			}
	// 			if (newCountry) {
	// 				newCountry.save((err, savedCountry) => {
	// 					if (err) throw err;
	// 					return "Location saved";
	// 				});
	// 			}
	// 		})
	// 	})
	// }
}