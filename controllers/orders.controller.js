// DB models
var models = require("../models").models;

// Today's order for current user
function getOrder(req, res, next) {

	// Query orders for current user and today
	models.order
		.findOne({
			where: {
				userId: res.userInfo.id,
				dateStamp: res.now.dateStamp
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

// Last x orders for current user and restaurant
function getPastOrders(req, res, next) {
	
	// Query for last x orders for current user
	models.order
		.findAll({
			where: {
				userId: res.userInfo.id,
				restaurantId: parseInt(req.params.restaurantId || "0", 10),
				dateStamp: { $ne: res.now.dateStamp }
			},
			limit: parseInt(req.query.limit || "5", 10),
			order: "dateStamp DESC" // most recent orders
		})
		.then(function(orders) {

			// Return the records - reverse order so it's essentially bottom X records
			res.send(orders.reverse());
		});
}

// All of today's orders for specific restaurant
function getDailyOrders(req, res, next) {
	
	// Query by today and restaurant
	models.order
		.findAll({
			where: {
				restaurantId:  parseInt(req.params.restaurantId || "0", 10),
				dateStamp:res.now.dateStamp
			},
			order: "firstName, lastName" // Order by user names
		})
		.then(function(orders) {
			
			// Send orders in response
			res.send(orders);
		});
}

// Create and / or update the current user's order for today
function createUpdateOrder(req, res, next) {

	// Query order for current user and today, create if it doesn't exist
	models.order
		.findOrCreate({
			defaults: {
				restaurantId: parseInt(req.body.restaurantId || "0", 10)
			},
			where: {
				userId: res.userInfo.id,
				dateStamp: res.now.dateStamp
			}
		})
		.then(function() {
		
			// Update order again
			models.order
				.update(
					{
						restaurantId: parseInt(req.body.restaurantId || "0", 10),
						item: (req.body.item || "").trim(),
						notes: (req.body.notes || "").trim(),
						firstName: res.userInfo.firstName,
						lastName: res.userInfo.lastName,
						email: res.userInfo.email,
					},
					{
						where: {
							userId: res.userInfo.id,
							dateStamp: res.now.dateStamp
						}
					}
				).then(function() {
					
					// Query order again
					models.order
						.findOne({
							where: {
								userId: res.userInfo.id,
								dateStamp: res.now.dateStamp
							}		
						}).then(function(order) {
							
							// Return record
							res.send(order);
						});
				});
		});
}

// Insert a guest order
function createGuestOrder(req, res, next) {

	// Insert guest order, pulling all fields from request with null userId
	models.order
		.create(
			{
				userId: null,
				dateStamp: res.now.dateStamp,
				restaurantId: parseInt(req.body.restaurantId || "0", 10),
				item: (req.body.item || "").trim(),
				notes: (req.body.notes || "").trim(),
				firstName: (req.body.firstName || "").trim(),
				lastName: (req.body.lastName || "").trim(),
				email: (req.body.email || "").trim()
			}
		).then(function(order) {

			// Return created order
			res.send(order);
		});
}

// Delete the current user's order for today
function deleteOrder(req, res, next) {
						
	// Query order
	models.order
		.findOne({
			where: {
				userId: res.userInfo.id,
				dateStamp: res.now.dateStamp
			}		
		}).then(function(order) {
			
			if (order !== null) {
				
				// Found record, delete it
				models.order
					.destroy({
						where: {
							userId: res.userInfo.id,
							dateStamp: res.now.dateStamp
						}		
					}).then(function() {
						
						// End response, no body
						res.send();
					});
				
			} else {
			
				// Not found, so 404
				next();
			}
	});
}

// Expose our functions
module.exports = {
	getOrder: getOrder,
	getPastOrders: getPastOrders,
	createUpdateOrder: createUpdateOrder,
	createGuestOrder: createGuestOrder,
	deleteOrder: deleteOrder,
	getDailyOrders: getDailyOrders
};