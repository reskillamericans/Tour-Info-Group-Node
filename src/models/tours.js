const mongoose = require('mongoose');
const { Schema } = mongoose;

const tourSchema = new Schema({
	title: String,
	descriptions: String,
	images: [String],
	featureImage: String,
  notes: String,
	city:  String,
  country: String,
	price: Number,
	duration: Number,
	date: Date,
  category: {
  	type: String,
  	enum: ['solo', 'group', 'private']
  },
  travelType: {
  	type: String,
  	enum: ['road', 'air', 'boat', 'castle']
  }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
