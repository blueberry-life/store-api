const Product = require("../models/product");
const queryChecker = require("../helpers/query-checker");

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
  // NOTE: if you don't set options in findOneUpdate it wont check for validators on updated item
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(
      createCustomError(`there is no product with id: ${productId}`, 404)
    );
  }
  return res
    .status(200)
    .json({ success: true, data: { msg: "product updated", product } });
}

async function deleteProduct(req, res, next) {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    return next(
      createCustomError(`there is no product with id: ${productId}`, 404)
    );
  }
  return res
    .status(200)
    .json({ success: true, data: { msg: "product deleted", product } });
}

async function getAllProductStatic(req, res, next) {
  const productList = await Product.find({});
  return res
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
  return res
    .status(200)
    .json({ success: true, data: { nbHits: productList.length, productList } });
}

module.exports = {
  getAllProductStatic,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
