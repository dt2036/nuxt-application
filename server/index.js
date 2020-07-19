const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const server = require('../api/index');
const envconfig = require('dotenv').config();
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

async function start() {
    const nuxt = new Nuxt(config);

    const { host, port } = nuxt.options.server;

    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    } else {
        await nuxt.ready();
    }

    server.handler.use(nuxt.render);

    server.handler.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });
}
start();
