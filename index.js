// For auth and other stuff
var middleware = require("./middleware");

// Controllers for routes
var controllers = require("./controllers");

// Routing
var express = require("express");

// Token verification endpoint
var googleAuthEndpoint = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=";

// Google Client Id for LunchWave
var googleClientId = "81013546075-98q3k6srmd4v83eic0uk299ku1tkn5kl.apps.googleusercontent.com";

// Port the server will run on
var port = process.env.PORT || 3001;

// Get instance of express
var app = express();

// Invoker
var self = this;

// Function for checking / setting auth
var checkSetAuth = middleware.checkSetAuth.bind(self, googleAuthEndpoint, googleClientId);

// Ran for all API requests
app.use(
	"/api/*",
	middleware.syncDB,
	middleware.jsonParse,
	middleware.setHeader.bind(self, "Cache-Control", "no-cache"),
	middleware.setHeader.bind(self, "Content-Type", "application/json"),
	middleware.setDateTime
);

// Application info
app.get(
	"/api/appinfo",
	controllers.getAppInfo.bind(self, googleClientId)
);

// Current user info
app.get(
	"/api/user",
	checkSetAuth,
	middleware.setAdmin,
	controllers.getUser
);

// Today's order for current user
app.get(
	"/api/user/order",
	checkSetAuth,
	controllers.getOrder
);

// Create / update today's order for current user
app.post(
	"/api/user/order",
	checkSetAuth,
	middleware.checkOrderingClosed,
	middleware.setRestaurants,
	middleware.checkRestaurantActive,
	controllers.createUpdateOrder
);

// Delete today's order for current user
app.delete(
	"/api/user/order",
	checkSetAuth,
	middleware.checkOrderingClosed,
	controllers.deleteOrder
);

// Last x orders for current user and restaurant (excluding today) - can use ?limit=x or default to 5
app.get(
	"/api/user/pastorders/:restaurantId",
	checkSetAuth,
	middleware.setRestaurants,
	middleware.checkRestaurantActive,
	controllers.getPastOrders
);

//Get all restaurant orders for today
app.get("/api/restaurants/:restaurantId/orders",
	checkSetAuth,
	middleware.setRestaurants,
	middleware.checkRestaurantActive,
	controllers.getDailyOrders
);

// Insert guest order for today
app.post(
	"/api/guest/order",
	checkSetAuth,
	middleware.setAdmin,
	middleware.checkAdmin,
	middleware.checkOrderingClosed,
	middleware.setRestaurants,
	middleware.checkRestaurantActive,
	controllers.createGuestOrder
);

// See if current day is closed for ordering
app.get(
	"/api/closedday",
	checkSetAuth,
	controllers.getClosedDay
);

// Close current day for ordering
app.post(
	"/api/closedday",
	checkSetAuth,
	middleware.setAdmin,
	middleware.checkAdmin,
	controllers.closeDay
);

// Re-open current day for ordering
app.delete(
	"/api/closedday",
	checkSetAuth,
	middleware.setAdmin,
	middleware.checkAdmin,
	controllers.openDay
);

// All restaurants open for the day
app.get(
	"/api/restaurants",
	checkSetAuth,
	middleware.setRestaurants,
	controllers.getRestaurants
);

app.get(
	"/api/restaurants/:restaurantId/images",
	checkSetAuth,
	middleware.setRestaurants,
	middleware.checkRestaurantActive,
	controllers.getRestaurantImages
);

// 404 for API requests - must be last api route defined
app.use(
	"/api/*",
	middleware.notFound
);

// Static files / UI
app.use(express.static("public"));

// Start the server
app.listen(port, function() {
  console.log("[server] Express listening http://localhost:" + port + "/");
});