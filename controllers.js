// DB and models
var oDB = require("./database.js");

// Current user
function vGetUser(oReq, oRes) {
	oRes.send(oRes.userInfo);
}

// Application info
function vGetAppInfo(cGoogleClientId, oReq, oRes) {
	oRes.send({
		googleClientId: cGoogleClientId
	});
}

// See if ordering is closed for the day
function vGetClosedDay(oReq, oRes, fNext) {
	
	// See if a closed day record exists for today
	oDB.models.closedDay
		.findOne({
			where: {
				id: oRes.now.dateStamp.toString()
			}
		})
		.then(function(oClosedDay) {
			
			// Record found
			if (oClosedDay !== null) {
				
				// Return the record
				oRes.send(oClosedDay);
				
			// Not found, so 404
			} else {
				
				// Continue to next route
				fNext();
			}
		});
}

// Close ordering for the day
function vCloseDay(oReq, oRes) {
	
	// See if a closed day record exists for today, create if not
	oDB.models.closedDay
		.findOrCreate({
			where: {
				id: oRes.now.dateStamp.toString()
			}
		})
		.then(function(aClosedDays) {
			
			// Return the record
			oRes.send(aClosedDays[0]);
		});
}

// All restaurants for current day
function vGetRestaurants(oReq, oRes, fNext) {

	// Return restaurants from response object
	oRes.send(oRes.restaurants);
}

// Today's order for current user
function vGetOrder(oReq, oRes, fNext) {

	// Query order for current user and today
	oDB.models.order
		.findOne({
			where: {
				userId: oRes.userInfo.id,
				dateStamp: oRes.now.dateStamp.toString()
			}		
		})
		.then(function(oOrder) {

			// Found results
			if (oOrder !== null) {
			
				// Return the record
				oRes.send(oOrder);			
			} else {
				
				// Not found, so 404
				fNext();
			}
		});
}

// Create and / or update the current user's order for today
function vCreateUpdateOrder(oReq, oRes, fNext) {
	
	// See if restaurantId passed in is active today
	if (
		oRes.restaurants.filter(function(oValue) {
			return oValue.id === parseInt(oReq.body.restaurantId || "0", 10);
		}).length === 0
	) {
		
		// It's not, so 404
		fNext();
	} else {

		// Query order for current user and today, create if it doesn't exist
		oDB.models.order
			.findOrCreate({
				where: {
					userId: oRes.userInfo.id,
					dateStamp: oRes.now.dateStamp.toString()
				}
			})
			.then(function() {
				
				// Update order again
				oDB.models.order
					.update(
						{
							restaurantId: oReq.body.restaurantId,
							item: (oReq.body.item || "").trim(),
							notes: (oReq.body.notes || "").trim(),
							firstName: oRes.userInfo.firstName,
							lastName: oRes.userInfo.lastName,
							email: oRes.userInfo.email,
						},
						{
							where: {
								userId: oRes.userInfo.id,
								dateStamp: oRes.now.dateStamp.toString()
							}
						}
					).then(function() {
						
						// Query order again
						oDB.models.order
							.findOne({
								where: {
									userId: oRes.userInfo.id,
									dateStamp: oRes.now.dateStamp.toString()
								}		
							}).then(function(oOrder) {
								
								// Return record
								oRes.send(oOrder);
							});
					});
			});	
	}
}

// Expose our functions
module.exports = {
	getUser: vGetUser,
	getAppInfo: vGetAppInfo,
	getClosedDay: vGetClosedDay,
	closeDay: vCloseDay,
	getRestaurants: vGetRestaurants,
	getOrder: vGetOrder,
	createUpdateOrder: vCreateUpdateOrder
};