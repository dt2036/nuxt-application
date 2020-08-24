import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';
 
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'https://localhost:3000', // Your API domain
  
  providers: {
    facebook: {
      clientId: 641312619821977, //your Facebook App ID e.g. 12345667890
      redirectUri: 'https://localhost:3000/', // Your client app URL
      responseType: 'token',
      authorizationEndpoint: 'https://www.facebook.com/v3.0/dialog/oauth',
    }
  }
})

