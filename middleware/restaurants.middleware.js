// Common includes
var common = require("./common.middleware.js");

// All restaurants or all restaurants for current day
function setRestaurants(openOnly, req, res, next) {

	// Set up object to query for weekday
	var query = {};
	query.active = true;
	
	// Only querying for active restaurants
	if (openOnly) {
		
		// Set weekday to query on
		query[res.now.weekDay] = true;
	}

	// Query restaurants
	common.models.restaurant
		.findAll({
			where: query,
			order: "sunday DESC, monday DESC, tuesday DESC, wednesday DESC, thursday DESC, friday DESC, saturday DESC, name"
		})
		.then(function(restaurants) {

			// Set restaurants for subsequent requests
			res.restaurants = restaurants;
			
			// Continue to next route
			next();
		});
}

// Ensure restaurant from request exists
function checkRestaurant(notFound, req, res, next) {
	
	// Invoker
	var self = this;
	
	// Initially false
	var valid = false;
	
	// Restaurant ID from request
	var restaurantId = parseInt(req.body.restaurantId || req.params.restaurantId || "0", 10)
	
	// See if restaurantId passed in exists
	if (res.restaurants.filter(function(val) { return val.id === restaurantId; }).length > 0) {
		
		// We're good
		valid = true;
	}
	
	// Callback, continue to next route
	common.checkContinue.apply(
		self,
		[
			valid,
			notFound ? common.statusCodes.notFound : common.statusCodes.forbidden,
			common.message("Sorry, the restaurant you requested was not found or is not open today."),
			res,
			next
		]
	);
}

// Expose our functions
module.exports = {
	setRestaurants: setRestaurants,
	checkRestaurant: checkRestaurant
};