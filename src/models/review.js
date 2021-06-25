const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: String,
    comment: String,
    rating: Number,
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location"
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review; 
