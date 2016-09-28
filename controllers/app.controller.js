// DB
var db = require("../dbinstance");

// Application info
function getAppInfo(googleClientId, req, res) {
	res.send({
		googleClientId: googleClientId,
		now: res.now
	});
}

// Expose our functions
module.exports = {
	getAppInfo: getAppInfo
};