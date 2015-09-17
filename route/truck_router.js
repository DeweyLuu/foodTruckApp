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
				//results[thecity.City] = thecity.City;
				//results.city = thecity.City;
				anotherresult.push(thecity.City);
			})
			//console.log(results);
			//anotherresult.push(results);
			//res.send(JSON.stringify(results));
			console.log(anotherresult);
			res.send(anotherresult);
		});
	})

	router.route('/trucks/types')
	.get(function(req, res) {
		var results = {};
		var resultToSend = [];
		var types = [
			{Italian: '0x01'},
			{Mexican: '0x2'},
			{Chinese: '0x4'},
			{Indian: '0x8'},
			{Thai: '0x10'},
			{Japanese: '0x20'},
			{Greek: '0x40'},
			{American: '0x80'},
  		{Spanish: '0x100'},
  		{French: '0x200'},
  		{Mediterranean: '0x400'},
  		{Lebanese: '0x800'},
  		{Vietnamese: '0x1000'},
  		{Korean: '0x2000'},
  		{Turkish: '0x4000'},
  		{Moroccan: '0x8000'},
  		{Soul: '0x10000'},
  		{Caribbean: '0x20000'},
  		{German: '0x40000'}
		];

		for (var cuisine in types) {
			results[cuisine] = types[cuisine];
			resultToSend.push();
		}
		var typeToSend = JSON.stringify(types);
		console.log(resultToSend);
		console.log(JSON.stringify(types));
		console.log(types);
		//res.send(JSON.stringify(results));
		res.send(JSON.stringify(types));
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
