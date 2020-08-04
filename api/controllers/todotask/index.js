const express = require('express');
const router = express.Router();

const todosController = require('./todos.controller');

router.use("/todos", todosController);

module.exports = router;