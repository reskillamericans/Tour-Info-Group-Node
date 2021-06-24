const countryList = require('../models/countries.json');

function seedCountries() {
	for (var i = 0; i < countryList.length; i++){
		Location.create({
			name: countryList[i].name,
			type: "country"
		})
	}
	console.log('countries seeded successfully');
}