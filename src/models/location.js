const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    title: String,
    type: {
        type: String,
        enum: ['country','city']
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
});
const Location = mongoose.model('Location', locationSchema);
module.exports = Location;