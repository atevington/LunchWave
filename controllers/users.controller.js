// DB
var db = require("../dbinstance");

// Current user
function getUser(req, res) {
	res.send(res.userInfo);
}

// Expose our functions
module.exports = {
	getUser: getUser
};