const express = require("express");
const router = express.Router();

class CartController {
    async post(request, response) {
        response.json({ added: true });
    }
}
router.post("/", CartController.post)