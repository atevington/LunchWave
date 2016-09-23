// DB and models
var oDB = require("./database.js");

// HTTP / HTTPS library
var oHTTP = require("request");

// For JSON parsing
var oParser = require("body-parser")

// Status code lookup
var oStatusCodes = { ok: 200, notAuthorized: 401, forbidden: 403, notFound: 404, error: 500 };

// Parse request body into JSON
function vJSONParse() {
	
	// Invoker
	var oSelf = this;
	
	// Forward to JSON parser
	oParser.json().apply(oSelf, arguments);
}

// Get DB up to date
function vSyncDB(oReq, oRes, fNext) {
	
	// Sync all tables
	oDB.store.sync().then(function() {
		
		// Continue to next route
		fNext();
	});
}

// Generic method for setting response headers
function vSetHeader(cHeader, cValue, oReq, oRes, fNext) {
	
	// Set header
	oRes.set(cHeader, cValue);
	
	// Continue to next route
	fNext();
}

// Tag request with current date / time / weekday
function vSetDateTime(oReq, oRes, fNext) {
	
	// Current date / time
	var oNow = new Date();
	
	// Current date / no time
	var oDateStamp = new Date(oNow.getFullYear(), oNow.getMonth(), oNow.getDate());
	
	// All weekdays (for querying)
	var aWeekDays = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];

	// Set date / time / weekday context for subsequent routes
	oRes.now = {
		timeStamp: oNow.getTime(),
		dateStamp: oDateStamp.getTime(),
		weekDay: aWeekDays[oDateStamp.getDay()]
	};
	
	// Continue to next route
	fNext();
}

// Verify Google sign-in
function vCheckSetAuth(cGoogleAuthEndpoint, cGoogleClientId, oReq, oRes, fNext) {

	// Invoker
	var oSelf = this;
	
	// Initially false
	var lValid = false;
	
	// User object to attach to request
	var oUser = null;
	
	// Token passed from header
	var cToken = (oReq.get("X-Google-Token") || "").trim();
	
	// HTTPS request to Google endpoint with token
	oHTTP(cGoogleAuthEndpoint + encodeURIComponent(cToken), function (oError, oResponse, oBody) {
		
		// OK response
		if (!oError && oResponse.statusCode === oStatusCodes.ok) {
			oUser = JSON.parse(oBody);
			
			// Token must have been issued for LunchWave and not another app
			if (oUser.aud === cGoogleClientId) {
				
				// We're good
				lValid = true;
				
				// Set user context for subsequent routes
				oRes.userInfo = {
					id: oUser.sub,
					firstName: oUser.given_name,
					lastName: oUser.family_name,
					email: oUser.email,
					administrator: false
				};
			}
		}

		// Callback, continue to next route
		vCheckContinue.apply(
			oSelf,
			[
				lValid,
				oStatusCodes.notAuthorized,
				oMessage("Please login to access this resource."),
				oRes,
				fNext
			]
		);
	});
}

// Flag current user as admin or not
function vSetAdmin(oReq, oRes, fNext) {
	
	// Search for an administrator record for the current user id
	oDB.models.administrator
		.findOne({
			where: {
				id: oRes.userInfo.id
			}
		})
		.then(function(oAdministrator) {

			// Record found
			if (oAdministrator !== null) {
				
				// Flag user as admin
				oRes.userInfo.administrator = true;
			}
			
			// Continue to next route
			fNext();
		});
}

// See if the current user is an administrator
function vCheckAdmin(oReq, oRes, fNext) {
	
	// Invoker
	var oSelf = this;
	
	// Initially false
	var lValid = false;

	// Administrator?
	if (oRes.userInfo && oRes.userInfo.administrator) {
		
		// We're good
		lValid = true;
	}
	
	// Callback, continue to next route
	vCheckContinue.apply(
		oSelf,
		[
			lValid,
			oStatusCodes.forbidden,
			oMessage("You must be an administrator to access this resource."),
			oRes,
			fNext
		]
	);
}

// See if ordering is closed for the day
function vCheckOrderingClosed(oReq, oRes, fNext) {
	
	// Invoker
	var oSelf = this;
	
	// Initially false
	var lValid = false;

	// Query for closed day based off request date / time
	oDB.models.closedDay
		.findOne({
			where: {
				id: oRes.now.dateStamp.toString()
			}
		})
		.then(function(oClosedDay) {

			// No day found
			if (oClosedDay === null) {
				
				// We're good
				lValid = true;
			}
			
			// Callback, continue to next route
			vCheckContinue.apply(
				oSelf,
				[
					lValid,
					oStatusCodes.forbidden,
					oMessage("Sorry, ordering is closed for today."),
					oRes,
					fNext
				]
			);
		});
}

// All restaurants for current day
function vGetRestaurants(oReq, oRes, fNext) {

	// Set up object to query for weekday
	var oQuery = {};
	oQuery[oRes.now.weekDay] = true;
	oQuery.active = true;

	// Query active restaurants for current day
	oDB.models.restaurant
		.findAll({ where: oQuery, order: "name ASC" })
		.then(function(aRestaurants) {

			// Set open restaurants for subsequent requests
			oRes.restaurants = aRestaurants;
			
			// Continue to next route
			fNext();
		});
}

// Generic method for continuing to next route
function vContinueRequest(oReq, oRes, fNext) {
	
	// Continue to next route
	fNext();
}

// 404 handler
function vNotFound(oReq, oRes) {
	
	// Route isn't found, so send a 404 with a nice message
	oRes.status(oStatusCodes.notFound).send(oMessage("The resource you requested cannot be found."));
}

// Method for continuing to next route or throwing an error
function vCheckContinue(lValid, nErrorCode, oError, oRes, fNext) {
	
	// If valid, continue to next route
	if (lValid) {
		fNext();
		
	// Otherwise, send the appropriate error code and message
	} else {
		oRes.status(nErrorCode).send(oError);
	}
}

// Method for returning a message object
function oMessage(cMessage) {
	return {
		message: cMessage.trim()
	};
}

// Expose our functions
module.exports = {
	jsonParse: vJSONParse,
	syncDB: vSyncDB,
	setHeader: vSetHeader,
	setDateTime: vSetDateTime,
	checkSetAuth: vCheckSetAuth,
	getRestaurants: vGetRestaurants,
	setAdmin: vSetAdmin,
	checkAdmin: vCheckAdmin,
	checkOrderingClosed: vCheckOrderingClosed,
	continueRequest: vContinueRequest,
	notFound: vNotFound
};