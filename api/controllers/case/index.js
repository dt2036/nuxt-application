const express = require('express');
const router = express.Router();

const crudController = require('./crud.controller');

router.use("/", crudController);

module.exports = router;