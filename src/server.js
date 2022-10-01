require("dotenv").config();

const http = require("http");

const expressApp = require("./express");
const connectDb = require("./db/connect");

// SECTION: this variables imported from .env file
const port = process.env.PORT;
const dbUrl = process.env.dbUrl;
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
// !SECTION

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
