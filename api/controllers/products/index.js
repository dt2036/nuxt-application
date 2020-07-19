const express = require('express');
const router = express.Router();

const productsController = require('./products.controller');

router.use("/products", productsController);

module.exports = router;