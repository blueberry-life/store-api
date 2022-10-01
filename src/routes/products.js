const express = require("express");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleTask,
} = require("../controllers/products");

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:id")
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(getSingleTask);

module.exports = router;
