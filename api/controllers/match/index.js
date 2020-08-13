const express = require('express');
const router = express.Router();

const matchController = require('./match.controller');

router.use("/", matchController);

module.exports = router;