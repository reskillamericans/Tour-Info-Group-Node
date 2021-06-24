const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	comments: {
		type: [String]
	},
	rating: {
		type: [Number],
		required: true
	},
	avgRating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	location: {
		type: Schema.Types.ObjectId,
		ref: "Location"
	}
});

module.exports = mongoose.model('Review', reviewSchema);