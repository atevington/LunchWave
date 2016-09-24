// ORM
var sequelize = require("sequelize");

// SQLite instance
var db = new sequelize(undefined, undefined, undefined, {
	dialect: "sqlite",
	storage: "./data/database.sqlite"
});

// Closed days for ordering
var closedDay = db.define(
	"closedDay",
	{ id: { field: "id", type: sequelize.STRING(255), primaryKey: true, allowNull: false } },
	{ tableName: "closedDays" }
);

// Lunch administrators
var administrator = db.define(
	"administrator",
	{ id: { field: "id", type: sequelize.STRING(255), primaryKey: true, allowNull: false } },
	{ tableName: "administrators" }
);

// Restaurants
var restaurant = db.define(
	"restaurant",
	{
		name: { field: "name", type: sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		active: { field: "active", type: sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: true },
		sunday: { field: "sunday", type: sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		monday: { field: "monday", type: sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		tuesday: { field: "tuesday", type: sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		wednesday: { field: "wednesday", type: sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		thursday: { field: "thursday", type: sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		friday: { field: "friday", type: sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false },
		saturday: { field: "saturday", type: sequelize.BOOLEAN, primaryKey: false, allowNull: false, defaultValue: false }
	},
	{ tableName: "restaurants" }
);

// Restaurant images
var restaurantImage = db.define(
	"restaurantImage",
	{
		restaurantId: { field: "restaurantId", type: sequelize.INTEGER, primaryKey: false, allowNull: false, defaultValue: 0 },
		fileName: { field: "fileName", type: sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" }
	},
	{ tableName: "restaurantImages" }
);

var order = db.define(
	"order",
	{
		restaurantId: { field: "restaurantId", type: sequelize.INTEGER, primaryKey: false, allowNull: false, defaultValue: 0 },
		item: { field: "item", type: sequelize.STRING(50), primaryKey: false, allowNull: false, defaultValue: "" },
		notes: { field: "notes", type: sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		userId: { field: "userId", type: sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		firstName: { field: "firstName", type: sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		lastName: { field: "lastName", type: sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		email: { field: "email", type: sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		dateStamp: { field: "dateStamp", type: sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" }
	},
	{ tableName: "orders" }
);

// Expose our functions
module.exports = {
	store: db,
	models: {
		closedDay: closedDay,
		administrator: administrator,
		restaurant: restaurant,
		restaurantImage: restaurantImage,
		order: order
	}
};