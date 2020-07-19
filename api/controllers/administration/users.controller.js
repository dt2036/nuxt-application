var Router = require('express').Router;
var router = Router();

var authorization = require("../../infrastructure/middleware/authorization");

class UsersController {

    static async get(request, response) {
        response.json([
            { isActive: true, age: 40, first_name: 'John', last_name: process.env.STAGE },
            { isActive: false, age: 21, first_name: 'Dev', last_name: 'Shaw' },
            { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
            { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]);
    }

    static async getBy(request, response) {
        var id = parseInt(request.params.id);
        if (id >= 0 && id < UsersController.users.length) {
            response.json(UsersController.users[id]);
        }
        else 
            response.sendStatus(404);
    }
}
///authorization check
router.get('/', [authorization([])], UsersController.get);
//without authorization check
router.get('/:id', UsersController.getBy);
module.exports = router;
