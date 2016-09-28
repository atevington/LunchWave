// Expose our functions
module.exports = {
	getUser: require("./users.controller.js").getUser,
	getAppInfo: require("./app.controller.js").getAppInfo,
	getClosedDay: require("./closeddays.controller.js").getClosedDay,
	closeDay: require("./closeddays.controller.js").closeDay,
	openDay: require("./closeddays.controller.js").openDay,
	getRestaurants: require("./restaurants.controller.js").getRestaurants,
	getOrder: require("./orders.controller.js").getOrder,
	getPastOrders: require("./orders.controller.js").getPastOrders,
	getDailyOrders: require("./orders.controller").getDailyOrders,
	createUpdateOrder: require("./orders.controller.js").createUpdateOrder,
	createGuestOrder: require("./orders.controller.js").createGuestOrder,
	deleteOrder: require("./orders.controller.js").deleteOrder
};
