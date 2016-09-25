// Common includes
var common = require("./common.middleware.js");

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
	common.http(googleAuthEndpoint + encodeURIComponent(token), function (error, response, body) {
		
		// OK response
		if (!error && response.statusCode === common.statusCodes.ok) {
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
		common.checkContinue.apply(
			self,
			[
				valid,
				common.statusCodes.notAuthorized,
				common.message("Please login to access this resource."),
				res,
				next
			]
		);
	});
}

// Expose our functions
module.exports = {
	checkSetAuth: checkSetAuth
};