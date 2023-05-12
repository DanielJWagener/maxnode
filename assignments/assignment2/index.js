const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
	console.log("users middleware");
	next();
});

// app.use("/users", (req, res, next) => {
// 	res.send("<h1>Users</h1>");
// });

// app.use("/", (req, res, next) => {
// 	console.log("middleware 1");
// 	next();
// });
// app.use("/", (req, res, next) => {
// 	console.log("middleware 2");
// 	next();
// });
app.use("/", (req, res, next) => {
	res.send("<h1>First Express assignment</h1>");
});
app.listen(4001);
