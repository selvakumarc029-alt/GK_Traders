const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductBySlug,
  createProduct,
} = require('../controllers/productController');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:slug').get(getProductBySlug);

module.exports = router;
