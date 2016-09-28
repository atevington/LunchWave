// DB
var db = require("../dbinstance");

// Restaurants
var restaurant = db.store.define(
	"restaurant",
	{
		name: { field: "name", type: db.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		active: { field: "active", type: db.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: true },
		sunday: { field: "sunday", type: db.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		monday: { field: "monday", type: db.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		tuesday: { field: "tuesday", type: db.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		wednesday: { field: "wednesday", type: db.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		thursday: { field: "thursday", type: db.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		friday: { field: "friday", type: db.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		saturday: { field: "saturday", type: db.sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false }
	},
	{ tableName: "restaurants" }
);

// Expose our functions
module.exports = {
	restaurant: restaurant
};