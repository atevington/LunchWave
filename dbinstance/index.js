// ORM
var sequelize = require("sequelize");

// SQLite instance
var store = new sequelize(undefined, undefined, undefined, {
	dialect: "sqlite",
	storage: "./data/database.sqlite"
});

// Expose our functions
module.exports = {
	store: store,
	sequelize: sequelize
};