
const express = require('express');
const router = express.Router();
productsController = require('../controllers/ProductsController');
router.get('/all-products',productsController.index)
router.get('/add-product',productsController.create);
router.post('/add-product',productsController.store);


module.exports = router;