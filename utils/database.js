const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "090907986", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
