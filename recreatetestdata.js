/*
This will drop and re-create your database and create some test restaurants

Example usage: node recreatetestdata.js
*/

// DB
var db = require("./database.js");

// For spawning processes
var exec = require("child_process").execSync;

// Always prepended to command
var prefixCommands = ["node", "dbadmin.js"];

// Utilities
var util = require("util");

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
	["create", "restaurant", stringifyWrap(sunday)],
	["create", "restaurant", stringifyWrap(monday)],
	["create", "restaurant", stringifyWrap(tuesday)],
	["create", "restaurant", stringifyWrap(wednesday1)],
	["create", "restaurant", stringifyWrap(wednesday2)],
	["create", "restaurant", stringifyWrap(thursday1)],
	["create", "restaurant", stringifyWrap(thursday2)],
	["create", "restaurant", stringifyWrap(friday)],
	["create", "restaurant", stringifyWrap(saturday)]
];

// Pipe child output to parent
var commandOptions = { stdio: [0, 1, 2] };

// Command to run
var command = "";

// Drop and re-create DB
db.store.sync({ force: true }).then(function() {
	console.log(arguments);
	
	// Space
	console.log();
	
	// Each command..
	for (var i = 0; i < commands.length; i++) {

		// Setup command
		command = prefixCommands.concat(commands[i]).join(" ");
	
		// Show command
		console.log(command);
		
		// Space
		console.log();
		
		// Exec command
		exec(command, commandOptions);
		
		// Space
		console.log();
	}
});

// Wrap single quotes around object
function stringifyWrap(obj) {
	
	// Stringify without double quotes
	return "\"" + util.inspect(obj) + "\"";
}