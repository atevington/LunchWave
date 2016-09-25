// Common includes
var common = require("./common.controllers.js");

// See if ordering is closed for the day
function getClosedDay(req, res, next) {
	
	// See if a closed day record exists for today
	common.db.models.closedDay
		.findOne({
			where: {
				id: res.now.dateStamp.toString()
			}
		})
		.then(function(closedDay) {
			
			// Record found
			if (closedDay !== null) {
				
				// Return the record
				res.send(closedDay);
				
			// Not found, so 404
			} else {
				
				// Continue to next route
				next();
			}
		});
}

// Close ordering for the day
function closeDay(req, res) {
	
	// See if a closed day record exists for today, create if not
	common.db.models.closedDay
		.findOrCreate({
			where: {
				id: res.now.dateStamp.toString()
			}
		})
		.then(function(closedDays) {
			
			// Return the record
			res.send(closedDays[0]);
		});
}

// Expose our functions
module.exports = {
	getClosedDay: getClosedDay,
	closeDay: closeDay
};