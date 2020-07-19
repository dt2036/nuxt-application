const express = require('express');
const router = express.Router();

const usersController = require('./users.controller');

router.use("/users", usersController);

module.exports = router;