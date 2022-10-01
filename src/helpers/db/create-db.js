require("dotenv").config();

const connectDb = require("../../db/connect");
const Product = require("../../models/product");
const productList = require("./products.json");

// SECTION: this variables imported from .env file
const dbUrl = process.env.dbUrl;
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
// !SECTION

async function createDb() {
  try {
    await connectDb(dbUrl, username, password);
    await Product.deleteMany();
    await Product.create(productList);
    console.log("connected to database and mock data created!!");
  } catch (error) {
    console.log(error);
  }
}

createDb();
