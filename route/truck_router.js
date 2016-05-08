var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cuisineTypes = require('./cuisineTypes.js');
var returnTypes = require('./returnTypes.js');

var bodyParser = require('body-parser');
var Truck = require('../models/truck.js');

var sendThat = [];

module.exports = function(router) {
	router.use(bodyParser.json());

	router.route('/trucks')
	.get(function(req, res) {
		Truck.find({}, function(err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log(data);
				console.log('successfully get');
				res.json(data);
			}
		});
	})

	router.route('/trucks/cities')
	.get(function(req, res) {
		var results = {};
		var anotherresult = [];
		Truck.find({}, function(err, data) {
			data.forEach(function(thecity) {
				console.log(thecity.City);
				anotherresult.push(thecity.City);
			})
			console.log(anotherresult);
			res.send(anotherresult);
		});
	})

	router.route('/trucks/types')
	.get(function(req, res) {
		console.log(JSON.stringify(cuisineTypes));
		res.send(JSON.stringify(cuisineTypes));
	})

	router.route('/trucks/:name', function(req, res) {
		var theName = req.params.user;
		Truck.find({Name: theName}, function(err, data) {
			if (err) {
				console.log(err);
			}
			res.json({msg: 'found!'});
		})
	});

	router.route('/trucks/find')
	.post(function(req, res) {
		var type = req.body.Type;
		var name = req.body.Name;
		var location = req.body.Location;
		var city = req.body.City;
		var distance = req.body.Distance;
		Truck.find({}, function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var answer = findShit(name, type, location, city, distance, data);
				//res.send(sendThat);
				console.log(answer);
				res.send(answer);
			}
		})

	});

	router.route('/trucks/add')
	.post(function(req, res) {
		console.log('accessed post route');
		var newTruck = new Truck(req.body);
		newTruck.save(function(err, data) {
			if (err) {
				console.log(err);
				return res.status(500).json({result: 1, message: 'server error'});
			}
			console.log('added');
			res.json({result: 0});
		});
	});
}

function findStuff(name, type, location, city, distance, data) {
	var resultOne = [];
	data.forEach(function(returnIt) {
		if((type & returnIt.Type) > 0) {
			resultOne.push(returnIt);
				//console.log(returnIt);
		}
	})
	return resultOne;
}

