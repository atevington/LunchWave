// Expose our functions
module.exports = {
	jsonParse: require("./middleware/json.middleware.js").jsonParse,
	syncDB: require("./middleware/db.middleware.js").syncDB,
	setHeader: require("./middleware/header.middleware.js").setHeader,
	setDateTime: require("./middleware/datetime.middleware.js").setDateTime,
	checkSetAuth: require("./middleware/auth.middleware.js").checkSetAuth,
	setRestaurants: require("./middleware/restaurants.middleware.js").setRestaurants,
	checkRestaurantActive: require("./middleware/restaurants.middleware.js").checkRestaurantActive,
	setAdmin: require("./middleware/admin.middleware.js").setAdmin,
	checkAdmin: require("./middleware/admin.middleware.js").checkAdmin,
	checkOrderingClosed: require("./middleware/orderingclosed.middleware.js").checkOrderingClosed,
	notFound: require("./middleware/notfound.middleware.js").notFound
};