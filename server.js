var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

var truckRoute = express.Router();

var theDb = 'mongodb://foodtrucks:starbucks99@ds027819.mongolab.com:27819/foodtrucks' || 'mongodb://' + process.env.MONGOUSER + ':' +
	process.env.MONGOPW + '@ds027819.mongolab.com:27819/foodtrucks';

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
