const express = require('express');
const router = express.Router();

const playerController = require('./player.controller');

router.use("/", playerController);

module.exports = router;