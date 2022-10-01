const Product = require("../models/product");
const queryChecker = require("../helpers/query-checker");

async function getAllProductStatic(req, res, next) {
  const productList = await Product.find({});
  res
    .status(200)
    .json({ success: true, data: { nbHits: productList.length, productList } });
}
async function getAllProducts(req, res, next) {
  const { name, company, featured, sort } = req.query;
  const userQuery = queryChecker(name, featured, company);
  // SECTION: this code checks if sort exists and if exist if there is multiple sort refactor it for use in .sort mongoose method
  let result = Product.find(userQuery);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  const productList = await result;
  // !SECTION
  res
    .status(200)
    .json({ success: true, data: { nbHits: productList.length, productList } });
}

module.exports = { getAllProductStatic, getAllProducts };
