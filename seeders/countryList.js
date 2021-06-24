const countryList = require('../models/countries.json');

function seedCountries() {
	for (var i = 0; i < countryList.length; i++){
		// conditions if location already exists
		Location.findOne({countryList[i].name: req.body.name}, (err, existingLocation) => {
			if (err) {
				return res.status(500).json({err});
			}
			if (existingLocation) {
				return res.status(400).json({message: "this location already exists."})
			}
		//create location 
		Location.create({
			name: countryList[i].name,
			type: "country"
		}, (err, createdCountry) => {
			if (err) throw err;
			createdCountry.save((err, savedCountry) => {
				if (err) throw err;
				console.log("Country Saved!");
			})
		})
	}
	console.log('country seeded successfully');
}