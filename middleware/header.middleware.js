// Common includes
var common = require("./common.middleware.js");

// Generic method for setting response headers
function setHeader(header, val, req, res, next) {
	
	// Set header
	res.set(header, val);
	
	// Continue to next route
	next();
}

// Expose our functions
module.exports = {
	setHeader: setHeader
};