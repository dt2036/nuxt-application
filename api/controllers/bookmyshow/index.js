const express = require('express');
const router = express.Router();

const listsController = require('./list.controller');

router.use("/list", listsController);

module.exports = router;