// DB models
var models = require("../models").models;

// Get all menu images for a restaurant
function getRestaurantImages(req, res, next) {

	// Return restaurants from response object
	models.restaurantImage
		.findAll({
			where: {restaurantId: parseInt(req.params.restaurantId || "0", 10)},
			order: "id"
		})
		.then(function(images) {
			res.send(images);
		});
}

// Expose our functions
module.exports = {
	getRestaurantImages: getRestaurantImages
};