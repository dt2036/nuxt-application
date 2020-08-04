var Router = require('express').Router;
var router = Router();

var authorization = require("../../infrastructure/middleware/authorization");
const BookMyShowDomain = require('../../domain/bookmyshow.domain');
class ListsController {

    static async get(request, response) {
        const bookmyshowDomain = new BookMyShowDomain();
        bookmyshowDomain.getListDatas(request,response);
    }

    static async getById(request, response) {
        const bookmyshowDomain = new BookMyShowDomain();
        bookmyshowDomain.getById(request.params,response);
    }

}
///authorization check
router.get('/', [authorization([])], ListsController.get);
router.get("/GetById/:id", ListsController.getById);
module.exports = router;
