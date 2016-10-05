// Expose our functions
module.exports = {
	jsonParse: require("./json.middleware.js").jsonParse,
	syncDB: require("./db.middleware.js").syncDB,
	setHeader: require("./header.middleware.js").setHeader,
	setDateTime: require("./datetime.middleware.js").setDateTime,
	checkSetAuth: require("./auth.middleware.js").checkSetAuth,
	setRestaurants: require("./restaurants.middleware.js").setRestaurants,
	checkRestaurant: require("./restaurants.middleware.js").checkRestaurant,
	setAdmin: require("./admin.middleware.js").setAdmin,
	checkAdmin: require("./admin.middleware.js").checkAdmin,
	checkOrderingClosed: require("./orderingclosed.middleware.js").checkOrderingClosed,
	notFound: require("./notfound.middleware.js").notFound
};