// DB
var db = require("../dbinstance");

// Restaurant images
var restaurantImage = db.store.define(
	"restaurantImage",
	{
		url: { field: "url", type: db.sequelize.STRING(1000), primaryKey: false, allowNull: false, defaultValue: "" }
	},
	{ tableName: "restaurantImages" }
);

// Expose our functions
module.exports = {
	restaurantImage: restaurantImage
};