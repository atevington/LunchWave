// DB
var db = require("../dbinstance");

// Orders
var order = db.store.define(
	"order",
	{
		item: { field: "item", type: db.sequelize.STRING(50), primaryKey: false, allowNull: false, defaultValue: "" },
		notes: { field: "notes", type: db.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		userId: { field: "userId", type: db.sequelize.STRING(255), primaryKey: false, allowNull: true },
		firstName: { field: "firstName", type: db.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		lastName: { field: "lastName", type: db.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		email: { field: "email", type: db.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		dateStamp: { field: "dateStamp", type: db.sequelize.BIGINT, primaryKey: false, allowNull: false, defaultValue: 0 }
	},
	{ tableName: "orders" }
);

// Expose our functions
module.exports = {
	order: order
};