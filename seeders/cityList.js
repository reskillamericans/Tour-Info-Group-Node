const cityList = require('../models/cities.json');

//add callback functions to the .create functions
// if city is created...
function seedCities() {
	for (var i = 0; i < cityList.length; i++){
		Location.create({
			name: cityList[i].name,
			type: "city"
		}, (err, createdCity) => {
			if (err) throw err;
			// if city already exists

			createdCity.save((err, savedCity) => {
				if (err) throw err;
				console.log("City Saved!");
			})
		})
	}
	console.log('cities seeded successfully');
}

