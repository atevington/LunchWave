// For auth and other stuff
var oMiddleware = require("./middleware.js");

// Controllers for routes
var oControllers = require("./controllers.js");

// Routing
var oExpress = require("express");

// Token verification endpoint
var cGoogleAuthEndpoint = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=";

// Google Client Id for LunchWave
var cGoogleClientId = "81013546075-98q3k6srmd4v83eic0uk299ku1tkn5kl.apps.googleusercontent.com";

// Port the server will run on
var nPort = parseInt(process.argv[2] || 3001, 10);

// Get instance of express
var oApp = oExpress();

// Invoker
var oSelf = this;

// Function for checking / setting auth
var fCheckSetAuth = oMiddleware.checkSetAuth.bind(oSelf, cGoogleAuthEndpoint, cGoogleClientId);

// Ran for all API requests
oApp.use(
	"/api/*",
	oMiddleware.syncDB,
	oMiddleware.jsonParse,
	oMiddleware.setHeader.bind(oSelf, "Cache-Control", "no-cache"),
	oMiddleware.setHeader.bind(oSelf, "Content-Type", "application/json"),
	oMiddleware.setDateTime,
	oMiddleware.continueRequest
);

// Application info
oApp.get(
	"/api/appInfo",
	oControllers.getAppInfo.bind(oSelf, cGoogleClientId)
);

// Current user info
oApp.get(
	"/api/user",
	fCheckSetAuth,
	oMiddleware.setAdmin,
	oControllers.getUser
);

// See if current day is closed for ordering
oApp.get(
	"/api/closedDay",
	fCheckSetAuth,
	oControllers.getClosedDay
);

// Close current day for ordering
oApp.post(
	"/api/closedDay",
	fCheckSetAuth,
	oMiddleware.setAdmin,
	oMiddleware.checkAdmin,
	oControllers.closeDay
);

// All restaurants open for the day
oApp.get(
	"/api/restaurants",
	fCheckSetAuth,
	oMiddleware.getRestaurants,
	oControllers.getRestaurants
);

// Today's order for current user
oApp.get(
	"/api/order",
	fCheckSetAuth,
	oControllers.getOrder
);

// Update today's order for current user
oApp.post(
	"/api/order",
	fCheckSetAuth,
	oMiddleware.checkOrderingClosed,
	oMiddleware.getRestaurants,
	oControllers.createUpdateOrder
);

// 404 for API requests - must be last api route defined
oApp.use(
	"/api/*",
	oMiddleware.notFound
);

// Static files / UI
oApp.use(oExpress.static("public"));

// Start the server
oApp.listen(nPort, function() {
	console.log("Listening on port " + nPort.toString() + "...");
});