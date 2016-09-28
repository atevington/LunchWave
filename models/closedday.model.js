// DB
var db = require("../dbinstance");

// Closed days for ordering
var closedDay = db.store.define(
	"closedDay",
	{ id: { field: "id", type: db.sequelize.STRING(255), primaryKey: true, allowNull: false } },
	{ tableName: "closedDays" }
);

// Expose our functions
module.exports = {
	closedDay: closedDay
};