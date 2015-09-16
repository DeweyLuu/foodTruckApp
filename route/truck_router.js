var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bodyParser = require('body-parser');
var Truck = require('../models/truck.js');

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
				results[thecity.City] = thecity.City;
			})
			console.log(results);
			anotherresult.push(results);
			//res.send(JSON.stringify(results));
			console.log(anotherresult);
			res.send(anotherresult);
		});
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
/*
		//Truck.find({'City': req.body.City}, function(err, data) {
		//Truck.find(findShit(), function(err, data) {
			if (err) {
				console.log(err);
			}
			console.log(data);
			res.json(data);
		})
			*/
		findShit(req, res, function(truck) {

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
function findShit(req, res, callback) {
	Truck.find({'City': req.body.City} || {'Type': req.body.Type})
		.exec(function(err, data) {
			if (err) {
				console.log(err);
			}
			console.log(data);
			res.json(data);
		})
	//{'City': req.body.City}
}
