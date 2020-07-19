const express = require("express");
const router = express.Router();
const ProductDomain = require('../../domain/product.domain');

class ProductsController {
    static async get(request, response) {
        const productDomain = new ProductDomain();
        productDomain.getProducts(request.params,response);
    }
}
router.get("/:pageNumber/:totalCount", ProductsController.get);
module.exports = router;

