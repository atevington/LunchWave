/*
This will drop and re-create your database and create some test restaurants

Example usage: node .\utility\recreatetestdata.js
*/

// DB
var db = require("../models");

// Restaurants to create
var sunday = {name: "Sunday Restaurant", sunday: true};
var monday = {name: "Monday Restaurant", monday: true};
var tuesday = {name: "Tuesday Restaurant", tuesday: true};
var wednesday1 = {name: "Wednesday Restaurant 1", wednesday: true};
var wednesday2 = {name: "Wednesday Restaurant 2", wednesday: true};
var thursday1 = {name: "Thursday Restaurant 1", thursday: true};
var thursday2 = {name: "Thursday Restaurant 2", thursday: true};
var friday = {name: "Friday Restaurant", friday: true};
var saturday = {name: "Saturday Restaurant", saturday: true};

// All commands to be run
var commands = [
	["create", "restaurant", sunday],
	["create", "restaurant", monday],
	["create", "restaurant", tuesday],
	["create", "restaurant", wednesday1],
	["create", "restaurant", wednesday2],
	["create", "restaurant", thursday1],
	["create", "restaurant", thursday2],
	["create", "restaurant", friday],
	["create", "restaurant", saturday]
];

// Drop and re-create DB
db.store.sync({ force: true }).then(function() {

	// Each command..
	for (var i = 0; i < commands.length; i++) {

		// Execute command
		db.models[commands[i][1]][commands[i][0]](commands[i][2]);
	}
});