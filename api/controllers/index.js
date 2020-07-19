const express = require('express');
const router = express.Router();

const authenticationController = require('./core/authentication.controller');
const authorizationController = require('./core/authorization.controller');

const administrationRouter = require('./administration');
const productsRouter = require('./products');

router.use("/authentication", authenticationController);
router.use("/authorization", authorizationController);
router.use("/administration", administrationRouter);
router.use("/product", productsRouter);


module.exports = router;