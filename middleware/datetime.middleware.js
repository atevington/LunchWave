// Common includes
var common = require("./common.middleware.js");

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

// Expose our functions
module.exports = {
	setDateTime: setDateTime
};