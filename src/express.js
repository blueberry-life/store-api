const express = require("express");

const routeNotFound = require("./controllers/404");
const errorHandler = require("./middleware/error-handler");
const productRoutes = require("./routes/products");

const app = express();

//  SECTION: builtin express middleware
app.use(express.json());
//  !SECTION

// SECTION: Routes
app.use("/api/v1/products", productRoutes);
app.use(errorHandler);
app.use(routeNotFound);
//  !SECTION

module.exports = app;
