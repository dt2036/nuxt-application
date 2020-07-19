
module.exports = {
    mode: 'universal',
    telemetry: false,
    target: 'server',
    server: {
        port: 3000, // default: 3000
        host: 'localhost' // default: localhost
      },
    head: {
        title: 'Nuxt Sample Application',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Sample Application' },
        ],
    },
    render: {
        static: {
            setHeaders(res) {
                res.setHeader('X-Frame-Options', 'ALLOWALL')
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('Access-Control-Allow-Methods', 'GET')
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
            }
        }
    },
    buildModules: [
        '@nuxtjs/vuetify'
    ],
    modules: [
        '@nuxt/http',
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'bootstrap-vue/nuxt'
    ],
    vuetify: {
        materialIcons: true,
        css: false,
        treeShake: true
    },
    plugins: [
        '~plugins/vuetify'
    ],
    //http: {
    //   // baseURL: 'http://localhost:3000',
    //},

    render: {
        compressor: false,
    },
    serverMiddleware: [
        '~/api/index.js'
    ],
    auth: {
        redirect: {
            callback: '/callback',
            logout: '/signed-out'
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/api/authentication', method: 'post' },
                    user: { url: '/api/authorization/user', method: 'get', propertyName: 'user' }
                },
                token: {
                    property: 'token'
                }
            },
        }
    }
}
