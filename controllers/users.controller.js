// Common includes
var common = require("./common.controllers.js");

// Current user
function getUser(req, res) {
	res.send(res.userInfo);
}

// Expose our functions
module.exports = {
	getUser: getUser
};