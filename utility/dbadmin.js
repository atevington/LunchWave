/*
This is an internal command line utility for interacting with the database.
The command format is: node .\utility\dbadmin.js "method" "entity" "param1" ... "paramN"
You can pass quoted JSON or raw JS for params.

Examples:

node .\utility\dbadmin.js findAll restaurant

node .\utility\dbadmin.js findOne restaurant "{where: {id: 123}}"
node .\utility\dbadmin.js findOne restaurant '{\"where\": {\"id\": 123}}'

node .\utility\dbadmin.js create restaurant "{name: 'New Restaurant', sunday: true}"
node .\utility\dbadmin.js create restaurant '{\"name\": \"New Restaurant\", \"sunday\": true}'

node .\utility\dbadmin.js destroy restaurant "{where: {id: 123}}"
node .\utility\dbadmin.js destroy restaurant '{\"where\": {\"id\": 123}}'

node .\utility\dbadmin.js update restaurant "{name: 'Updated Name'}" "{where:{}}"
node .\utility\dbadmin.js update restaurant '{\"name\": \"Updated Name\"}' '{\"where\":{}}'

node .\utility\dbadmin.js update restaurant "{name: 'Updated Name'}" "{where: {id: 123}}"
node .\utility\dbadmin.js update restaurant '{\"name\": \"Updated Name\"}' '{\"where\": {\"id\": 123}}'
*/

// DB
var db = require("../database.js");

// CRUD action
var action = (process.argv[2] || "").trim();

// Model to act on
var model = (process.argv[3] || "").trim();

// CRUD params
var params = [];

// Go through each additional arg
for (var i = 4; i < process.argv.length; i++) {
	
	// Push to params array
	params.push(parseUnsafeJSON((process.argv[i] || "undefined").trim()));
}

// Ensure proper params
if (db.models[model] && db.models[model][action] && validParams(params)) {
	
	// Sync all tables
	db.store.sync().then(function() {
		
		// Execute action on model
		db.models[model][action].apply(db.models[model], params).then(function() {
			
			// Copy args object
			var output = Array.prototype.slice.call(arguments);

			// Output each result
			for (var i = 0; i < output.length; i++) {
				console.log("Output " + (i + 1).toString() + ":");
				console.log(output[i]);
			}
		});
	});
} else {
	
	// Notify error
	console.log("Error parsing input..");
}

// Turn command line input into an object
function parseUnsafeJSON(json) {
	
	// Eval input, return object
	try {
		return new Function("var query = " + json + "; return query;")();
		
	// Error, return null
	} catch (e) {
		return null;
	}
}

// Validate params
function validParams(params) {
	
	// Initially true
	valid = true;
	
	// Go through each..
	for (var i = 0; i < params.length; i++) {
		
		// Test only if valid
		if (valid) {
			
			// Params can be undefined or a non-null object
			if (typeof(params[i]) !== "undefined" && (params[i] === null || typeof(params[i]) !== "object")) {
				
				// Invalidate
				valid = false;
			}
		}
	}
	
	return valid;
}