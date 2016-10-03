// Common includes
var common = require("./common.middleware.js");

// See if ordering is closed for the day
function checkOrderingClosed(req, res, next) {
	
	// Invoker
	var self = this;
	
	// Initially false
	var valid = false;

	// Query for closed day based off request date / time
	common.models.closedDay
		.findOne({
			where: {
				id: res.now.dateStamp
			}
		})
		.then(function(closedDay) {

			// No day found
			if (closedDay === null) {
				
				// We're good
				valid = true;
			}
			
			// Callback, continue to next route
			common.checkContinue.apply(
				self,
				[
					valid,
					common.statusCodes.forbidden,
					common.message("Sorry, ordering is closed for today."),
					res,
					next
				]
			);
		});
}

// Expose our functions
module.exports = {
	checkOrderingClosed: checkOrderingClosed
};