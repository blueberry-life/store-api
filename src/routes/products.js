const express = require("express");

const {
  getAllProductStatic,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/static").get(getAllProductStatic);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

module.exports = router;
