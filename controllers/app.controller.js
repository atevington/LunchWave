// DB and models
var db = require("./database.js");

// Application info
function getAppInfo(googleClientId, req, res) {
	res.send({
		googleClientId: googleClientId
	});
}

// Expose our functions
module.exports{
	getAppInfo: getAppInfo
};