var Router = require('express').Router;
var router = Router();

var authorization = require("../../infrastructure/middleware/authorization");
const TeamDomain = require('../../domain/team.domain');
class TeamCrudController {

    static async get(request,response) {
        const teamDomain = new TeamDomain();
        teamDomain.getListData(request, response);
    }

    static async getTeamDropdown(request,response) {
        const teamDomain = new TeamDomain();
        teamDomain.getTeamDropdownData(request, response);
    }

    static async getById(request, response) {
        const teamDomain = new TeamDomain();
        teamDomain.getByIdData(request.params, response);
    }

    static async create(request, response) {
        request.body.updatedOn = new Date().toDateString();
        const teamDomain = new TeamDomain();
        teamDomain.createCase(request, response);
    }

    static async update(request, response) {
        request.body.updatedOn = new Date().toDateString();
        const teamDomain = new TeamDomain();
        teamDomain.updateCase(request, response);
    }

    static async delete(request, response) {
        request.body.createdOn = new Date();
        const teamDomain = new TeamDomain();
        teamDomain.deleteData(request.params.teamName, response);
    }



}
///authorization check
router.get('/GetAll', [authorization([])], TeamCrudController.get);
router.get('/GetTeamDropdownData', [authorization([])], TeamCrudController.getTeamDropdown);
router.get('/GetById/:sk/:tournamentId', [authorization([])], TeamCrudController.getById);
router.post('/Create', [authorization([])], TeamCrudController.create);
router.put('/Update', [authorization([])], TeamCrudController.update);
router.delete('/Delete/:teamName', [authorization([])], TeamCrudController.delete);
module.exports = router;
