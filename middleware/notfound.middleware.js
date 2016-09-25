// Common includes
var common = require("./common.middleware.js");

// 404 handler
function notFound(req, res) {
	
	// Route isn't found, so send a 404 with a nice message
	res.status(common.statusCodes.notFound).send(common.message("The resource you requested cannot be found."));
}

// Expose our functions
module.exports = {
	notFound: notFound
};