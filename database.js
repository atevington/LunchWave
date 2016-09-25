// Expose our functions
module.exports = {
	store: require("./models/common.model.js").db,
	models: {
		closedDay: require("./models/closedday.model.js").closedDay,
		administrator: require("./models/administrator.model.js").administrator,
		restaurant: require("./models/restaurant.model.js").restaurant,
		restaurantImage: require("./models/restaurantimage.model.js").restaurantImage,
		order: require("./models/order.model.js").order
	}
};