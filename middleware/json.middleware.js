// Common includes
var common = require("./common.middleware.js");

// Parse request body into json
function jsonParse() {
	
	// Invoker
	var self = this;
	
	// Forward to JSON parser
	common.parser.json().apply(self, arguments);
}

// Expose our functions
module.exports = {
	jsonParse: jsonParse
};