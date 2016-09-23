// ORM
var oSequelize = require("sequelize");

// SQLite instance
var oDB = new oSequelize(undefined, undefined, undefined, {
	dialect: "sqlite",
	storage: "./data/database.sqlite"
});

// Closed days for ordering
var oClosedDay = oDB.define(
	"closedDay",
	{ id: { field: "id", type: oSequelize.STRING(255), primaryKey: true, allowNull: false } },
	{ tableName: "closedDays" }
);

// Lunch administrators
var oAdministrator = oDB.define(
	"administrator",
	{ id: { field: "id", type: oSequelize.STRING(255), primaryKey: true, allowNull: false } },
	{ tableName: "administrators" }
);

// Restaurants
var oRestaurant = oDB.define(
	"restaurant",
	{
		name: { field: "name", type: oSequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		active: { field: "active", type: oSequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: true },
		sunday: { field: "sunday", type: oSequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		monday: { field: "monday", type: oSequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		tuesday: { field: "tuesday", type: oSequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		wednesday: { field: "wednesday", type: oSequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		thursday: { field: "thursday", type: oSequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		friday: { field: "friday", type: oSequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		saturday: { field: "saturday", type: oSequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false }
	},
	{ tableName: "restaurants" }
);

var oOrder = oDB.define(
	"order",
	{
		restaurantId: { field: "restaurantId", type: oSequelize.INTEGER, primaryKey: false, allowNull: false, defaultValue: 0 },
		item: { field: "item", type: oSequelize.STRING(50), primaryKey: false, allowNull: false, defaultValue: "" },
		notes: { field: "notes", type: oSequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		userId: { field: "userId", type: oSequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		firstName: { field: "firstName", type: oSequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		lastName: { field: "lastName", type: oSequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		email: { field: "email", type: oSequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		dateStamp: { field: "dateStamp", type: oSequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" }
	},
	{ tableName: "orders" }
);

// Expose our functions
module.exports = {
	store: oDB,
	models: {
		closedDay: oClosedDay,
		administrator: oAdministrator,
		restaurant: oRestaurant,
		order: oOrder
	}
};
