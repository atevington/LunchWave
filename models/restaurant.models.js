// Common includes
var common = require("./common.models.js");

// Restaurants
var restaurant = common.db.define(
	"restaurant",
	{
		name: { field: "name", type: common.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		active: { field: "active", type: common.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: true },
		sunday: { field: "sunday", type: common.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		monday: { field: "monday", type: common.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		tuesday: { field: "tuesday", type: common.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		wednesday: { field: "wednesday", type: common.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		thursday: { field: "thursday", type: common.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		friday: { field: "friday", type: common.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		saturday: { field: "saturday", type: common.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false }
	},
	{ tableName: "restaurants" }
);

// Expose our functions
module.exports = {
	restaurant: restaurant
};