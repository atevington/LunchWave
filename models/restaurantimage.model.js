// Common includes
var common = require("./common.model.js");

// Restaurant images
var restaurantImage = common.db.define(
	"restaurantImage",
	{
		restaurantId: { field: "restaurantId", type: common.sequelize.INTEGER, primaryKey: false, allowNull: false, defaultValue: 0 },
		fileName: { field: "fileName", type: common.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" }
	},
	{ tableName: "restaurantImages" }
);

// Expose our functions
module.exports = {
	restaurantImage: restaurantImage
};