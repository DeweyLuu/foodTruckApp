var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

var truckRoute = express.Router();

/*
process.env.MONGO_URL = 'mongodb://localhost/foodtruck';

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/foodtruck');
*/
var theDb = process.env.MONGOLAB_URI;
/*
var theDb = process.env.MONGO_URL =  'mongodb://' + process.env.MONGOUSER + ':' +
	process.env.MONGOPW + '@ds027819.mongolab.com:27819/foodtrucks' || process.env.MONGO_URL;
*/
mongoose.connect(theDb, function(err) {
	if (err) {
		console.log(err);
	}
	console.log('Successfully connected to MongoDb');
});

require('./route/truck_router.js')(truckRoute);

app.use('/api', truckRoute);

app.listen(port, function() {
	console.log('server is on ' + port);
});
