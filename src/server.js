require("dotenv").config();
require("express-async-errors");

const http = require("http");

const expressApp = require("./express");
const connectDb = require("./db/connect");

//  * this variables imported from backend.env file
const port = process.env.PORT;
const dbUrl = process.env.dbUrl;
const username = process.env.dbUser;
const password = process.env.dbPassword;

const server = http.createServer(expressApp);

async function startServer() {
  try {
    await connectDb(dbUrl, username, password);
    server.listen(port, () =>
      console.log(`connected to database server running on port ${port} ....`)
    );
  } catch (error) {
    console.log(error);
  }
}

startServer();
