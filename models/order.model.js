// Common includes
var common = require("./common.model.js");

// Orders
var order = common.db.define(
	"order",
	{
		item: { field: "item", type: common.sequelize.STRING(50), primaryKey: false, allowNull: false, defaultValue: "" },
		notes: { field: "notes", type: common.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		userId: { field: "userId", type: common.sequelize.STRING(255), primaryKey: false, allowNull: true },
		firstName: { field: "firstName", type: common.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		lastName: { field: "lastName", type: common.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		email: { field: "email", type: common.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" },
		dateStamp: { field: "dateStamp", type: common.sequelize.STRING(255), primaryKey: false, allowNull: false, defaultValue: "" }
	},
	{ tableName: "orders" }
);

// Expose our functions
module.exports = {
	order: order
};