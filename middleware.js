// DB and models
var db = require("./database.js");

// HTTP / HTTPS library
var http = require("request");

// For JSON parsing
var parser = require("body-parser");

// Status code lookup
var statusCodes = { ok: 200, notAuthorized: 401, forbidden: 403, notFound: 404, error: 500 };

// Parse request body into JSON
function jsonParse() {
	
	// Invoker
	var self = this;
	
	// Forward to JSON parser
	parser.json().apply(self, arguments);
}

// Get DB up to date
function syncDB(req, res, next) {
	
	// Sync all tables
	db.store.sync().then(function() {
		
		// Continue to next route
		next();
	});
}

// Generic method for setting response headers
function setHeader(header, val, req, res, next) {
	
	// Set header
	res.set(header, val);
	
	// Continue to next route
	next();
}

// Tag request with current date / time / weekday
function setDateTime(req, res, next) {
	
	// Current date / time
	var now = new Date();
	
	// Current date / no time
	var dateStamp = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	
	// All weekdays (for querying)
	var weekDays = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];

	// Set date / time / weekday context for subsequent routes
	res.now = {
		timeStamp: now.getTime(),
		dateStamp: dateStamp.getTime(),
		weekDay: weekDays[dateStamp.getDay()]
	};
	
	// Continue to next route
	next();
}

// Verify Google sign-in
function checkSetAuth(googleAuthEndpoint, googleClientId, req, res, next) {

	// Invoker
	var self = this;
	
	// Initially false
	var valid = false;
	
	// User object to attach to request
	var user = null;
	
	// Token passed from header
	var token = (req.get("X-Google-Token") || "").trim();
	
	// HTTPS request to Google endpoint with token
	http(googleAuthEndpoint + encodeURIComponent(token), function (error, response, body) {
		
		// OK response
		if (!error && response.statusCode === statusCodes.ok) {
			user = JSON.parse(body);
			
			// Token must have been issued for LunchWave and not another app
			if (user.aud === googleClientId) {
				
				// We're good
				valid = true;
				
				// Set user context for subsequent routes
				res.userInfo = {
					id: user.sub,
					firstName: user.given_name,
					lastName: user.family_name,
					email: user.email,
					administrator: false
				};
			}
		}

		// Callback, continue to next route
		checkContinue.apply(
			self,
			[
				valid,
				statusCodes.notAuthorized,
				message("Please login to access this resource."),
				res,
				next
			]
		);
	});
}

// Flag current user as admin or not
function setAdmin(req, res, next) {
	
	// Search for an administrator record for the current user id
	db.models.administrator
		.findOne({
			where: {
				id: res.userInfo.id
			}
		})
		.then(function(administrator) {

			// Record found
			if (administrator !== null) {
				
				// Flag user as admin
				res.userInfo.administrator = true;
			}
			
			// Continue to next route
			next();
		});
}

// See if the current user is an administrator
function checkAdmin(req, res, next) {
	
	// Invoker
	var self = this;
	
	// Initially false
	var valid = false;

	// Administrator?
	if (res.userInfo && res.userInfo.administrator) {
		
		// We're good
		valid = true;
	}
	
	// Callback, continue to next route
	checkContinue.apply(
		self,
		[
			valid,
			statusCodes.forbidden,
			message("You must be an administrator to access this resource."),
			res,
			next
		]
	);
}

// See if ordering is closed for the day
function checkOrderingClosed(req, res, next) {
	
	// Invoker
	var self = this;
	
	// Initially false
	var valid = false;

	// Query for closed day based off request date / time
	db.models.closedDay
		.findOne({
			where: {
				id: res.now.dateStamp.toString()
			}
		})
		.then(function(closedDay) {

			// No day found
			if (closedDay === null) {
				
				// We're good
				valid = true;
			}
			
			// Callback, continue to next route
			checkContinue.apply(
				self,
				[
					valid,
					statusCodes.forbidden,
					message("Sorry, ordering is closed for today."),
					res,
					next
				]
			);
		});
}

// All restaurants for current day
function setRestaurants(req, res, next) {

	// Set up object to query for weekday
	var query = {};
	query[res.now.weekDay] = true;
	query.active = true;

	// Query active restaurants for current day
	db.models.restaurant
		.findAll({ where: query, order: "name ASC" })
		.then(function(restaurants) {

			// Set open restaurants for subsequent requests
			res.restaurants = restaurants;
			
			// Continue to next route
			next();
		});
}

// Generic method for continuing to next route
function continueRequest(req, res, next) {
	
	// Continue to next route
	next();
}

// 404 handler
function notFound(req, res) {
	
	// Route isn't found, so send a 404 with a nice message
	res.status(statusCodes.notFound).send(message("The resource you requested cannot be found."));
}

// Method for continuing to next route or throwing an error
function checkContinue(valid, errorCode, error, res, next) {
	
	// If valid, continue to next route
	if (valid) {
		next();
		
	// Otherwise, send the appropriate error code and message
	} else {
		res.status(errorCode).send(error);
	}
}

// Method for returning a message object
function message(responseMessage) {
	return {
		message: responseMessage.trim()
	};
}

// Expose our functions
module.exports = {
	jsonParse: jsonParse,
	syncDB: syncDB,
	setHeader: setHeader,
	setDateTime: setDateTime,
	checkSetAuth: checkSetAuth,
	setRestaurants: setRestaurants,
	setAdmin: setAdmin,
	checkAdmin: checkAdmin,
	checkOrderingClosed: checkOrderingClosed,
	continueRequest: continueRequest,
	notFound: notFound
};