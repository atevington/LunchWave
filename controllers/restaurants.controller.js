// DB
var db = require("../models");

// All restaurants for current day
function getRestaurants(req, res, next) {

	// Return restaurants from response object
	res.send(res.restaurants);
}

// Expose our functions
module.exports = {
	getRestaurants: getRestaurants
};