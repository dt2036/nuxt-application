const express = require('express');
const router = express.Router();

const authenticationController = require('./core/authentication.controller');
const authorizationController = require('./core/authorization.controller');

const administrationRouter = require('./administration');
const productsRouter = require('./products');
const todosRouter = require('./todotask');
const bookmyshowRouter = require('./bookmyshow');
const caseRouter = require('./case');
const teamRouter = require('./team');
const matchRouter = require('./match');
const playerRouter = require('./player');

router.use("/authentication", authenticationController);
router.use("/authorization", authorizationController);
router.use("/administration", administrationRouter);
router.use("/product", productsRouter);
router.use("/todotask", todosRouter);
router.use("/bookmyshow", bookmyshowRouter);
router.use("/case", caseRouter);
router.use("/team", teamRouter);
router.use("/match", matchRouter);
router.use("/player", playerRouter);

module.exports = router;