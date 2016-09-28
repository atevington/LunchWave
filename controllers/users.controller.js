// DB
var db = require("../models");

// Current user
function getUser(req, res) {
	res.send(res.userInfo);
}

// Expose our functions
module.exports = {
	getUser: getUser
};