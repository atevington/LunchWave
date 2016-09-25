// ORM
var sequelize = require("sequelize");

// SQLite instance
var db = new sequelize(undefined, undefined, undefined, {
	dialect: "sqlite",
	storage: "./data/database.sqlite"
});

// Expose our functions
module.exports = {
	db: db,
	sequelize: sequelize
};