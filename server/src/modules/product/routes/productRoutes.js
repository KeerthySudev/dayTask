const ProductController = require('../controllers/productController');
const express = require('express');

const router = express.Router();

router.get('/showProducts',ProductController.showProducts);
router.get('/showCart',ProductController.showCart);
router.post('/addToCart',ProductController.addToCart);
router.post('/removeFromCart',ProductController.removeFromCart);

module.exports = router;