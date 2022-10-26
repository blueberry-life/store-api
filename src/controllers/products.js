const Product = require("../models/product");
const {
  sortChecker,
  fieldChecker,
  queryChecker,
  pagination,
} = require("../helpers/query-checkers");

async function getSingleTask(req, res, next) {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  res.status(200).json({ success: true, data: { product } });
}
async function createProduct(req, res, next) {
  const userInput = req.body;
  console.log(userInput);
  const product = await Product.create(userInput);

  return res
    .status(200)
    .json({ success: true, data: { msg: `${userInput} is created`, product } });
}

async function updateProduct(req, res, next) {
  const { id: productId } = req.params;
  // * if you don't set options in findOneUpdate it wont check for validators on updated item
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  return res
    .status(200)
    .json({ success: true, data: { msg: "product updated", product } });
}

async function deleteProduct(req, res, next) {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);
  return res
    .status(200)
    .json({ success: true, data: { msg: "product deleted", product } });
}

async function getAllProducts(req, res, next) {
  const userReq = req.query;

  // * this functions checks incoming request and if there was any query take it and modify's query object and execute it on db
  const userQuery = queryChecker(userReq);
  let result = Product.find(userQuery);
  sortChecker(userReq, result);
  fieldChecker(userReq, result);
  pagination(req.query, result);

  const productList = await result;
  return res
    .status(200)
    .json({ success: true, data: { nbHits: productList.length, productList } });
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleTask,
};
