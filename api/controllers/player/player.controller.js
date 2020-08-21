var Router = require('express').Router;
var router = Router();
const multer = require("multer");
const upload = multer({
    dest: "./assets/images"
});
var authorization = require("../../infrastructure/middleware/authorization");
const PlayerDomain = require('../../domain/player.domain');
var bouncer = require("../../infrastructure/security/bouncer");
const modelState = require('../../input-validation/model-state');
const PlayerCredentialSchema = require('../../schemas/player-credential');

class PlayerCrudController {

    static async get(request, response) {
        const playerDomain = new PlayerDomain();
        playerDomain.getListData(request, response);
    }

    static async getById(request, response) {
        const playerDomain = new PlayerDomain();
        playerDomain.getByIdData(request.params, response);
    }

    static async filterData(request, response) {
        const playerDomain = new PlayerDomain();
        playerDomain.getFilterData(request, response);
    }

    static async create(request, response) {
        request.body = request.data;
        request.body.updatedOn = new Date().toDateString();
        const playerDomain = new PlayerDomain();
        playerDomain.createPlayer(request, response);
    }

    static async update(request, response) {
        request.body.updatedOn = new Date().toDateString();
        const playerDomain = new PlayerDomain();
        playerDomain.updateCase(request, response);
    }

    static async delete(request, response) {
        request.body.createdOn = new Date();
        const playerDomain = new PlayerDomain();
        playerDomain.deleteData(request.params.teamName, response);
    }



}
///authorization check
router.get('/GetAll', [authorization([])], PlayerCrudController.get);
router.get('/GetById/:sk/:tournamentId', [authorization([])], PlayerCrudController.getById);
router.post('/Filter', [authorization([])], PlayerCrudController.filterData);
router.post('/Create', upload.single('file'), PlayerCrudController.create);
router.put('/Update', PlayerCrudController.update);
router.delete('/Delete/:teamName', [authorization([])], PlayerCrudController.delete);
module.exports = router;
