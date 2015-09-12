var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var truckSchema = new Schema({
	name: String,
	type: Number,
	location: {
		longitude: Number,
		latitude: Number
	},
	city: String
});

module.exports = mongoose.model('Truck', truckSchema);
