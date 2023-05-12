const express = require("express");
const app = express();

const homeRoutes = require("./routes/home");
const userRoutes = require("./routes/users");

app.use(homeRoutes);
app.use(userRoutes);

app.listen(4000);
