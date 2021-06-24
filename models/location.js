const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
location can be a city or a country,
should have a title, 
array of comments, 
array of ratings,
and an average rating (Number)
*/

const locationSchema = new Schema({
	title: String,
	type: {
		type: String,
		enum: ['country', 'city']
	},
	review: [{
		type: Schema.Types.ObjectId,
		ref: "Review"
	}]
});


module.exports = mongoose.model('Location', locationSchema);