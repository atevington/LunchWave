// Common includes
var common = require("./common.models.js");

// Lunch administrators
var administrator = common.db.define(
	"administrator",
	{ id: { field: "id", type: common.sequelize.STRING(255), primaryKey: true, allowNull: false } },
	{ tableName: "administrators" }
);

// Expose our functions
module.exports = {
	administrator: administrator
};