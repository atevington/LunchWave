// Common includes
var common = require("./common.model.js");

// Restaurant images
var restaurantImage = common.db.define(
	"restaurantImage",
	{
		fileName: { field: "fileName", type: common.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" }
	},
	{ tableName: "restaurantImages" }
);

// Expose our functions
module.exports = {
	restaurantImage: restaurantImage
};