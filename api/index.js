const express = require('express');
const app = express();

const routes = require('./controllers');
const security = require('./infrastructure/security/default');
const aws = require("aws-sdk");
const awsConfig = require('../config/aws-config');
aws.config.update(awsConfig );
security(app);
app.use(routes);

module.exports = {
  path: '/api',
  handler: app
}