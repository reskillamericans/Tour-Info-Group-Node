const countryList = require('../models/countries.json');

function seedCountries() {
	for (var i = 0; i < countryList.length; i++){
		//creat location seeded from country list
		Location.create({
			name: countryList[i].name,
			type: "country"
		}, (err, createdCountry) => {
			// callback for createdCountry
			if (err) throw err;
			createdCountry.save((err, savedCountry) => {
				if (err) throw err;
				console.log("Country Saved!");
			})
		})
	}
	console.log('country seeded successfully');
}