// DB and models
var db = require("./database.js");

// Current user
function getUser(req, res) {
	res.send(res.userInfo);
}

// Application info
function getAppInfo(googleClientId, req, res) {
	res.send({
		googleClientId: googleClientId
	});
}

// See if ordering is closed for the day
function getClosedDay(req, res, next) {
	
	// See if a closed day record exists for today
	db.models.closedDay
		.findOne({
			where: {
				id: res.now.dateStamp.toString()
			}
		})
		.then(function(closedDay) {
			
			// Record found
			if (closedDay !== null) {
				
				// Return the record
				res.send(closedDay);
				
			// Not found, so 404
			} else {
				
				// Continue to next route
				next();
			}
		});
}

// Close ordering for the day
function closeDay(req, res) {
	
	// See if a closed day record exists for today, create if not
	db.models.closedDay
		.findOrCreate({
			where: {
				id: res.now.dateStamp.toString()
			}
		})
		.then(function(closedDays) {
			
			// Return the record
			res.send(closedDays[0]);
		});
}

// All restaurants for current day
function getRestaurants(req, res, next) {

	// Return restaurants from response object
	res.send(res.restaurants);
}

// Today's order for current user
function getOrder(req, res, next) {

	// Query orders for current user and today
	db.models.order
		.findOne({
			where: {
				userId: res.userInfo.id,
				dateStamp: res.now.dateStamp.toString()
			}		
		})
		.then(function(order) {

			// Found results
			if (order !== null) {
			
				// Return the record
				res.send(order);			
			} else {
				
				// Not found, so 404
				next();
			}
		});
}

// Last x orders for current user
function getOrders(req, res, next) {
	
	// Query for last x orders for current user
	db.models.order
		.findAll({
			where: {
				userId: res.userInfo.id,
				dateStamp: { $ne: res.now.dateStamp.toString() }
			},
			limit: parseInt(req.query.limit || "5", 10),
			order: "dateStamp DESC" // most recent orders
		})
		.then(function(orders) {

			// Return the records - reverse order so it's essentially bottom X records
			res.send(orders.reverse());
		});
}

// Create and / or update the current user's order for today
function createUpdateOrder(req, res, next) {
	
	// See if restaurantId passed in is active today
	if (
		res.restaurants.filter(function(val) {
			return val.id === parseInt(req.body.restaurantId || "0", 10);
		}).length === 0
	) {
		
		// It's not, so 404
		next();
	} else {

		// Query order for current user and today, create if it doesn't exist
		db.models.order
			.findOrCreate({
				where: {
					userId: res.userInfo.id,
					dateStamp: res.now.dateStamp.toString()
				}
			})
			.then(function() {
				
				// Update order again
				db.models.order
					.update(
						{
							restaurantId: req.body.restaurantId,
							item: (req.body.item || "").trim(),
							notes: (req.body.notes || "").trim(),
							firstName: res.userInfo.firstName,
							lastName: res.userInfo.lastName,
							email: res.userInfo.email,
						},
						{
							where: {
								userId: res.userInfo.id,
								dateStamp: res.now.dateStamp.toString()
							}
						}
					).then(function() {
						
						// Query order again
						db.models.order
							.findOne({
								where: {
									userId: res.userInfo.id,
									dateStamp: res.now.dateStamp.toString()
								}		
							}).then(function(order) {
								
								// Return record
								res.send(order);
							});
					});
			});	
	}
}

// Expose our functions
module.exports = {
	getUser: getUser,
	getAppInfo: getAppInfo,
	getClosedDay: getClosedDay,
	closeDay: closeDay,
	getRestaurants: getRestaurants,
	getOrder: getOrder,
	getOrders: getOrders,
	createUpdateOrder: createUpdateOrder
};