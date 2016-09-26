// DB
var db = require("./models/common.model.js").db;

// All models
var closedDay = require("./models/closedday.model.js").closedDay;
var administrator = require("./models/administrator.model.js").administrator;
var restaurant = require("./models/restaurant.model.js").restaurant;
var restaurantImage = require("./models/restaurantimage.model.js").restaurantImage;
var order = require("./models/order.model.js").order;

// For entities that relate to restaurants
var restaurantForeignKey = {foreignKey: {name: "restaurantId", allowNull: false}};

// Order has a restaurant
order.belongsTo(restaurant, restaurantForeignKey);

// Restaurant image has a restaurant
restaurantImage.belongsTo(restaurant, restaurantForeignKey);

// Expose our functions
module.exports = {
	store: db,
	models: {
		closedDay: closedDay,
		administrator: administrator,
		restaurant: restaurant,
		restaurantImage: restaurantImage,
		order: order
	}
};