// DB models
var models = require("../models").models;

// Get all menu images for a restaurant
function getRestaurantImages(req, res, next) {

	// Find menu images for given restaurant
	models.restaurantImage
		.findAll({
			where: {
				restaurantId: parseInt(req.params.restaurantId || "0", 10)
			},
			order: "id"
		})
		.then(function(images) {
			
			// Send images in response
			res.send(images);
		});
}

// Expose our functions
module.exports = {
	getRestaurantImages: getRestaurantImages
};