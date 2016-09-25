// Common includes
var common = require("./common.middleware.js");

// Flag current user as admin or not
function setAdmin(req, res, next) {
	
	// Search for an administrator record for the current user id
	common.db.models.administrator
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
	common.checkContinue.apply(
		self,
		[
			valid,
			common.statusCodes.forbidden,
			common.message("You must be an administrator to access this resource."),
			res,
			next
		]
	);
}

// Expose our functions
module.exports = {
	setAdmin: setAdmin,
	checkAdmin: checkAdmin
};