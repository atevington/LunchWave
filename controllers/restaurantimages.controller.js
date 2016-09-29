var models = require("../models").models;

function getRestaurantImages(req, res, next) {

    // Return restaurants from response object
    models.restaurantImage.findAll({
        where: {restaurantId: parseInt(req.params.restaurantId || "0", 10)}
    })
        .then(function(images) {
            res.send(images);
        })
}

module.exports = {
    getRestaurantImages: getRestaurantImages
}