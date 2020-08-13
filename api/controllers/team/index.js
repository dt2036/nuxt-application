const express = require('express');
const router = express.Router();

const teamController = require('./team.controller');

router.use("/", teamController);

module.exports = router;