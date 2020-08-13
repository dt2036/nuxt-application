var Router = require('express').Router;
var router = Router();

var authorization = require("../../infrastructure/middleware/authorization");
const MatchDomain = require('../../domain/match.domain');
class MatchCrudController {

    static async get(request,response) {
        const matchDomain = new MatchDomain();
        matchDomain.getListData(request, response);
    }

    static async getById(request, response) {
        const matchDomain = new MatchDomain();
        matchDomain.getByIdData(request.params, response);
    }

    static async create(request, response) {
        request.body.updatedOn = new Date().toDateString();
        const matchDomain = new MatchDomain();
        matchDomain.createCase(request, response);
    }

    static async update(request, response) {
        request.body.updatedOn = new Date().toDateString();
        const matchDomain = new MatchDomain();
        matchDomain.updateCase(request, response);
    }

    static async delete(request, response) {
        request.body.createdOn = new Date();
        const matchDomain = new MatchDomain();
        matchDomain.deleteData(request.params.teamName, response);
    }



}
///authorization check
router.get('/GetAll', [authorization([])], MatchCrudController.get);
router.get('/GetById/:sk/:tournamentId', [authorization([])], MatchCrudController.getById);
router.post('/Create', [authorization([])], MatchCrudController.create);
router.put('/Update', [authorization([])], MatchCrudController.update);
router.delete('/Delete/:teamName', [authorization([])], MatchCrudController.delete);
module.exports = router;
