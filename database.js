// Expose our functions
module.exports = {
	store: require("./models/common.models.js").db,
	models: {
		closedDay: require("./models/closedday.models.js").closedDay,
		administrator: require("./models/administrator.models.js").administrator,
		restaurant: require("./models/restaurant.models.js").restaurant,
		restaurantImage: require("./models/restaurantimage.models.js").restaurantImage,
		order: require("./models/order.models.js").order
	}
};