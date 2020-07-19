const express = require('express');
const router = express.Router();

class AuthorizationController {

    static async getUser(request, response) {
        response.json({ user: request.user });
    }
}
router.get('/user', AuthorizationController.getUser);
module.exports = router;