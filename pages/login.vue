
<template>
  <div>
    <!-- <v-facebook-login app-id="966242223397117"></v-facebook-login> -->

    <div>
      <h2 class="text-center">Login</h2>
      <hr />
      <b-alert v-if="errorMessage" show variant="danger">{{ errorMessage }}</b-alert>
      <b-alert v-if="$auth.$state.redirect" show>
        You have to login before accessing to
        <strong>{{ $auth.$state.redirect }}</strong>
      </b-alert>
      <b-row align-h="center" class="pt-4">
        <b-col md="4">
          <b-card bg-variant="light">
            <busy-overlay />
            <form @keydown.enter="login">
              <b-form-group label="Username">
                <b-input ref="username" v-model="username" placeholder="anything" />
              </b-form-group>

              <b-form-group label="Password">
                <b-input v-model="password" type="password" placeholder="123" />
              </b-form-group>

              <div class="text-center">
                <b-btn variant="primary" block @click="login">Login</b-btn>
              </div>
            </form>
          </b-card>
        </b-col>
        <b-col md="1" align-self="center">
          <div class="text-center">
            <b-badge pill>OR</b-badge>
              <!-- <button @click="authenticate('facebook')">auth Facebook</button> -->
          </div>
        </b-col>
        <b-col md="4" class="text-center">
          <b-card title="Social Login" bg-variant="light">
            <div v-for="s in strategies" :key="s.key" class="mb-2">
              <b-btn
                block
                :style="{background: s.color}"
                class="login-button"
                 @click="$auth.loginWith(s.key)"
              
              >Login with {{ s.name }}</b-btn>
            </div>
            <div class="mb-2">
              <b-btn
                block
                :style="{background: 'purple'}"
                class="login-button"
                @click="$auth.loginWith('oauth2mock')"
              >Login with oauth2</b-btn>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style scoped>
.login-button {
  border: 0;
}
</style>

<script>
import busyOverlay from "~/components/busy-overlay";
//  import VFacebookLogin from 'vue-facebook-login-component'
export default {
  middleware: ["auth"],
  components: { busyOverlay },
  data() {
    return {
      username: "",
      password: "123",
      error: null,
    };
  },
  computed: {
    strategies: () => [
      { key: "auth0", name: "Auth0", color: "#ec5425" },
      { key: "google", name: "Google", color: "#4284f4" },
      { key: "facebook", name: "Facebook", color: "#3c65c4" },
      { key: "github", name: "GitHub", color: "#202326" },
    ],
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      );
    },
    isCallback() {
      return Boolean(this.$route.query.callback);
    },
    errorMessage() {
      const { error } = this;
      if (!error || typeof error === "string") {
        return error;
      }
      let msg = "";
      if (error.message) {
        msg += error.message;
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, "")
          .replace(/:/g, ": ")
          .replace(/,/g, " ")})`;
      }
      return msg;
    },
  },
  methods: {


  //  authenticate: function (provider) {
  //    debugger;
  //     const this_ = this
  //     this.$auth.authenticate(provider).then(function () {
  //       let token = this.$auth.getToken()
  //       this_.token = token
  //       alert(`login success with token ${token}`)
  //       if (provider === 'facebook') {
  //         this_.$http.get('https://graph.facebook.com/v3.0/me?fields=id,name,email', {
  //           params: { access_token: token }
  //         }).then(function (response) {
  //           this_.profile = JSON.stringify(response)
  //         })
  //       }
  //     })
  //   },
 

//     async loginWithSocial(key) {
//       this.error = null;
//  debugger;
//       if (key == "github") {
//         console.log(key);
//       }
//       const result = await this.$auth
//         .loginWith("github", {
//           client_id: "3a0c09da617e78993f0e",
//           client_secret: "a901d1c0f03eb8b5cb3ee0e14c61f7d3af0b2770",
//         })
         
       
//         .catch((e) => {
//            debugger;
//           this.error = e.response;
//         });
//         console.log( result);
//     },
    async loginWithSocial(key) {
      debugger;
      this.error = null;

      if (key == "facebook") {
        console.log(key);
      }
      debugger;
      const result = await this.$auth
        .loginWith('facebook', {
          client_id: "641312619821977",
        })
        .catch((e) => {
          debugger;
          this.error = e.response;
        });
    },

    async login() {
      this.error = null;

      const result = await this.$auth
        .loginWith("local", {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((e) => {
          this.error = e.response.data;
        });
    },
  },
};
</script>
