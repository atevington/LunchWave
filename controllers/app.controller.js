// DB models
var models = require("../models").models

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