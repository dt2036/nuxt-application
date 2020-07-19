const express = require('express');
const app = express();

const routes = require('./controllers');
const security = require('./infrastructure/security/default');

security(app);
app.use(routes);

module.exports = {
  path: '/api',
  handler: app
}