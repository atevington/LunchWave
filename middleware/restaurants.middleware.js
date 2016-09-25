// Common includes
var common = require("./common.middleware.js");

// All restaurants for current day
function setRestaurants(req, res, next) {

	// Set up object to query for weekday
	var query = {};
	query[res.now.weekDay] = true;
	query.active = true;

	// Query active restaurants for current day
	common.db.models.restaurant
		.findAll({ where: query, order: "name ASC" })
		.then(function(restaurants) {

			// Set open restaurants for subsequent requests
			res.restaurants = restaurants;
			
			// Continue to next route
			next();
		});
}

// Expose our functions
module.exports = {
	setRestaurants: setRestaurants
};