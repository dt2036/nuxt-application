const serverless = require('serverless-http');
const { Nuxt } = require('nuxt-start');
const Server = require('./api/index');

let config = require('./nuxt.config.js');
config.render = { etag: true, compressor: { threshold: Infinity } };
config.dev = false;

const nuxt = new Nuxt(config);


Server.handler.use(nuxt.render);

const handler = serverless(Server.handler, {
    type: 'edge-origin-request',
    platform: 'aws'
});

module.exports.handler = async (event, context) => {

    await nuxt.ready();

    return await handler(event, context);
};
