const cityList = require('../models/cities.json');

//add callback functions to the .create functions
// if city is created...
function seedCities() {
	for (var i = 0; i < cityList.length; i++){
		// conditions if location already exists
		Location.findOne({name: req.body.name}, (err, existingLocation) => {
			if (err) {
				return res.status(500).json({err});
			}
			if (existingLocation) {
				return res.status(400).json({message: "this location already exists."})
			}
			// create Location
			Location.create({
				name: cityList[i].name,
				type: "city"
			}, (err, createdCity) => {
				if (err) throw err;
			}, createdCity.save((err, savedCity) => {
				if (err) throw err;
				console.log("City Saved!");
			})
		})
		}
		console.log('cities seeded successfully');
	} 



			// if city already exists

			

