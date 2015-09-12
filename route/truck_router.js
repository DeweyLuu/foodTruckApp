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

	router.route('/trucks/find')
	.post(function(req, res) {
		//Truck.find({'City': req.body.City}), function(err, data) {
		Truck.find(findShit(), function(err, data) {
			if (err) {
				console.log(err);
			}
			console.log(data);
			res.json(data);
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
	{'City': req.body.City}
}
