var Router = require('express').Router;
var router = Router();

var authorization = require("../../infrastructure/middleware/authorization");

class TodosController {

    static async get(request, response) {
        response.json([
            { description: 'Login Page Ui', priority: 'Low', isCompleted: false },
            { description: 'Home Page Ui', priority: 'High', isCompleted: true }
        ]);
            
    }

  
}
///authorization check
router.get('/',[authorization([])], TodosController.get);
module.exports = router;
