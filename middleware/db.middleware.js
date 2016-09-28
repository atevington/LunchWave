// Common includes
var common = require("./common.middleware.js");

// Get DB up to date
function syncDB(req, res, next) {
	
	// Sync all tables
	common.store.sync().then(function() {
		
		// Continue to next route
		next();
	});
}

// Expose our functions
module.exports = {
	syncDB: syncDB
};