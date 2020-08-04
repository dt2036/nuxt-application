<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="4">
      <v-card class="px-4 float-center">
        <v-card-title color="red" class="justify-center">
          <h3>User Registration</h3>
        </v-card-title>
        <v-card-text>
          <v-form ref="registerForm" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="firstName"
                  :rules="[rules.required]"
                  label="First Name"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="lastName"
                  :rules="[rules.required]"
                  label="Last Name"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  block
                  v-model="verify"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, passwordMatch]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Confirm Password"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col> -->
              <v-spacer></v-spacer>
              <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                <v-btn x-large block :disabled="!valid" color="green" @click="validate">Register</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.login-button {
  border: 0;
}
</style>

<script>
import busyOverlay from "~/components/busy-overlay";

export default {
  // middleware: ['auth'],
  components: { busyOverlay },
  data: () => ({
    dialog: true,
    valid: true,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    async validate() {
      debugger;
      if (this.$refs.registerForm.validate()) {
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
      }
    },

    validate() {
      debugger;
      if (this.$refs.registerForm.validate()) {
        debugger;
        // submit form to server/API here...
      }
    },
  },
};
</script>
