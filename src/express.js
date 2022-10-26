const express = require("express");

const routeNotFound = require("./controllers/404");
const productRoutes = require("./routes/products");

const app = express();

//  * builtin express middleware
app.use(express.json());

// * Routes
app.use("/api/v1/products", productRoutes);
app.use(routeNotFound);

module.exports = app;
