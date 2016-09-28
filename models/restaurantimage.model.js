// Common includes
var common = require("./common.model.js");

// Restaurant images
var restaurantImage = common.db.define(
	"restaurantImage",
	{
		url: { field: "url", type: common.sequelize.STRING(1000), primaryKey: false, allowNull: false, defaultValue: "" }
	},
	{ tableName: "restaurantImages" }
);

// Expose our functions
module.exports = {
	restaurantImage: restaurantImage
};