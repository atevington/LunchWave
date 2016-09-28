// DB
var db = require("../models");

// HTTP / HTTPS library
var http = require("request");

// For JSON parsing
var parser = require("body-parser");

// Status code lookup
var statusCodes = { ok: 200, notAuthorized: 401, forbidden: 403, notFound: 404, error: 500 };

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
	db: db,
	http: http,
	parser: parser,
	statusCodes: statusCodes,
	checkContinue: checkContinue,
	message: message
};