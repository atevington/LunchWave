// Common includes
var common = require("./common.model.js");

// Closed days for ordering
var closedDay = common.db.define(
	"closedDay",
	{ id: { field: "id", type: common.sequelize.STRING(255), primaryKey: true, allowNull: false } },
	{ tableName: "closedDays" }
);

// Expose our functions
module.exports = {
	closedDay: closedDay
};