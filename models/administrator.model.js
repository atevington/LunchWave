// DB
var db = require("../dbinstance");

// Lunch administrators
var administrator = db.store.define(
	"administrator",
	{ id: { field: "id", type: db.sequelize.STRING(255), primaryKey: true, allowNull: false } },
	{ tableName: "administrators" }
);

// Expose our functions
module.exports = {
	administrator: administrator
};