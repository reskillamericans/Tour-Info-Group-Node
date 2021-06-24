const countryList = require('../seeders/countries.json');
const Location = require('../models/location');


exports.seedCountries = () => {
	for (var i = 0; i < countryList; i++) {
		// check if this country exists
		Location.findOne({name: countryList[i].name}, (err, existingCountry) => {
			if (err) throw err;
			if (existingCountry) {
				return "Location already exists";
			}
			// if country does not exist, create location
			Location.create({
				title: countryList[i].name,
				type: "country"
			}, (err, newCountry) => {
				if (err) {
					console.log(err);
				}
				if (newCountry) {
					console.log(newCountry);
				}
			})
		})
	}
}