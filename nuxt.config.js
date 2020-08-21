
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
        '@nuxtjs/vuetify',

    ],
    modules: [
        '@nuxt/http',
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'bootstrap-vue/nuxt',
        'nuxt-fontawesome',
        '@nuxtjs/toast',
    ],
    toast: {
        theme: "bubble",
        position: 'top-right',
        duration: 9000,
        register: [ // Register custom toasts
            {
                name: 'my-error',
                message: 'Oops...Something went wrong',
                options: {
                    type: 'error'
                }
            }
        ]
    },
    vuetify: {
        materialIcons: true,
        css: false,
        treeShake: true
    },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',

    ],
    plugins: [      
        '~plugins/vuetify',
        // {src: '~/plugins/vue-authenticate.js', ssr: false}


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
        // redirect: false,
        redirect: {
            callback: '/callback',
            logout: '/signed-out'
        },


        strategies: {
            local: {
                endpoints: {
                    login: { url: '/api/authentication', method: 'post' },
                    logout: false,
                    user: { url: '/api/authorization/user', method: 'get', propertyName: 'user' }
                },
                token: {
                    property: 'token'
                },
            
            },
            facebook: {
                client_id: 641312619821977, //your Facebook App ID e.g. 12345667890
                redirectUri: 'http://localhost:3000/', // Your client app URL
                responseType: 'token',
                authorizationEndpoint: 'https://www.facebook.com/v3.0/dialog/oauth',
              },
              google: {
                token_key: 'access_token',
                client_id: '357456209136-mrjmne1s18ptgsonv9rkkngpguf4im7p.apps.googleusercontent.com',
                redirectUri: 'http://localhost:3000/', // Your client app URL
                // clientId:'774357141762-joam3ad5g4lhdr9kgcm6bcu4kes38ml3.apps.googleusercontent.com'
                scope: ['openid', 'profile', 'email'],
              },
            github:{
                client_id: '0513721d8996e167e3e2',
                client_secret: 'b6413580e6fba1fe1123e653e522cca9a2e0d52c',
                redirectUri: 'http://localhost:3000/',
                
            },
        }
    }
}
