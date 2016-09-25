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

// Ensure restaurant is active today for current orders
function checkRestaurantActive(req, res, next) {
	
	// Invoker
	var self = this;
	
	// Initially false
	var valid = false;
	
	// See if restaurantId passed in is active today
	if (
		res.restaurants.filter(function(val) {
			return val.id === parseInt(req.body.restaurantId || "0", 10);
		}).length > 0
	) {
		
		// We're good
		valid = true;
	}
	
	// Callback, continue to next route
	common.checkContinue.apply(
		self,
		[
			valid,
			common.statusCodes.forbidden,
			common.message("Sorry, the restaurant you tried to order from is not open today."),
			res,
			next
		]
	);
}

// Expose our functions
module.exports = {
	setRestaurants: setRestaurants,
	checkRestaurantActive: checkRestaurantActive
};