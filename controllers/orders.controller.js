// Common includes
var common = require("./common.controllers.js");

// Today's order for current user
function getOrder(req, res, next) {

	// Query orders for current user and today
	common.db.models.order
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
	common.db.models.order
		.findAll({
			where: {
				userId: res.userInfo.id,
				restaurantId: parseInt(req.params.restaurantId || "0", 10),
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

	// Query order for current user and today, create if it doesn't exist
	common.db.models.order
		.findOrCreate({
			where: {
				userId: res.userInfo.id,
				dateStamp: res.now.dateStamp.toString()
			}
		})
		.then(function() {
		
			// Update order again
			common.db.models.order
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
					common.db.models.order
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

// Insert a guest order
function createGuestOrder(req, res, next) {

	// Insert guest order, pulling all fields from request with null userId
	common.db.models.order
		.create(
			{
				userId: null,
				dateStamp: res.now.dateStamp.toString(),
				restaurantId: req.body.restaurantId,
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
	common.db.models.order
		.findOne({
			where: {
				userId: res.userInfo.id,
				dateStamp: res.now.dateStamp.toString()
			}		
		}).then(function(order) {
			
			if (order !== null) {
				
				// Found record, delete it
				common.db.models.order
					.destroy({
						where: {
							userId: res.userInfo.id,
							dateStamp: res.now.dateStamp.toString()
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
	getOrders: getOrders,
	createUpdateOrder: createUpdateOrder,
	createGuestOrder: createGuestOrder,
	deleteOrder: deleteOrder
};