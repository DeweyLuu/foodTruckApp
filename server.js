var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

process.env.MONGO_URL = 'mongodb://localhost/foodtruck';

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/foodtruck');

var truckRoute = express.Router();

require('./route/truck_router.js')(truckRoute);

app.use('/api', truckRoute);

app.listen(port, function() {
	console.log('server is on ' + port);
});
