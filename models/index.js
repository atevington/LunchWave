// DB
var db = require("../dbinstance");

// All models
var closedDay = require("./closedday.model.js").closedDay;
var administrator = require("./administrator.model.js").administrator;
var restaurant = require("./restaurant.model.js").restaurant;
var restaurantImage = require("./restaurantimage.model.js").restaurantImage;
var order = require("./order.model.js").order;

// For entities that relate to restaurants
var restaurantForeignKey = {foreignKey: {name: "restaurantId", allowNull: false}};

// Order has a restaurant
order.belongsTo(restaurant, restaurantForeignKey);

// Restaurant image has a restaurant
restaurantImage.belongsTo(restaurant, restaurantForeignKey);

// Expose our functions
module.exports = {
	store: db.store,
	models: {
		closedDay: closedDay,
		administrator: administrator,
		restaurant: restaurant,
		restaurantImage: restaurantImage,
		order: order
	}
};