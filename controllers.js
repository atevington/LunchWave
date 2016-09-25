// Expose our functions
module.exports = {
	getUser: require("./controllers/users.controller.js").getUser,
	getAppInfo: require("./controllers/app.controller.js").getAppInfo,
	getClosedDay: require("./controllers/closeddays.controller.js").getClosedDay,
	closeDay: require("./controllers/closeddays.controller.js").closeDay,
	openDay: require("./controllers/closeddays.controller.js").openDay,
	getRestaurants: require("./controllers/restaurants.controller.js").getRestaurants,
	getOrder: require("./controllers/orders.controller.js").getOrder,
	getOrders: require("./controllers/orders.controller.js").getOrders,
	createUpdateOrder: require("./controllers/orders.controller.js").createUpdateOrder,
	deleteOrder: require("./controllers/orders.controller.js").deleteOrder
};