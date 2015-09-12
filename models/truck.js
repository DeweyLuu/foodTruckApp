var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var truckSchema = new Schema({
	Name: String,
	Type: Number,
	Location: {
		Longitude: Number,
		Latitude: Number
	},
	City: String
});

module.exports = mongoose.model('Truck', truckSchema);
