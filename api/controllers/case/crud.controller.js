var Router = require('express').Router;
var router = Router();

var authorization = require("../../infrastructure/middleware/authorization");
const CaseDomain = require('../../domain/case.domain');
class CRUDController {

    static async get(request,response) {
        const caseDomain = new CaseDomain();
        caseDomain.getListData(request, response);
    }

    static async getById(request, response) {
        const caseDomain = new CaseDomain();
        caseDomain.getByIdData(request.params.name, response);
    }

    static async create(request, response) {
        request.body.createdOn = new Date().toDateString();
        const caseDomain = new CaseDomain();
        caseDomain.createCase(request, response);
    }

    static async update(request, response) {
        request.body.createdOn = new Date().toDateString();
        console.log(request.body.createdOn);
        const caseDomain = new CaseDomain();
        caseDomain.updateCase(request, response);
    }

    static async delete(request, response) {
        request.body.createdOn = new Date();
        const caseDomain = new CaseDomain();
        caseDomain.deleteData(request.params.name, response);
    }



}
///authorization check
router.get('/GetAll', [authorization([])], CRUDController.get);
router.get('/GetById/:name', [authorization([])], CRUDController.getById);
router.post('/Create', [authorization([])], CRUDController.create);
router.put('/Update', [authorization([])], CRUDController.update);
router.delete('/Delete/:name', [authorization([])], CRUDController.delete);
module.exports = router;
