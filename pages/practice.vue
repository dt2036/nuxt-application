<template>
  <div>
    <div>
      <p>{{ message }}</p>
      <b-input v-model="message" placeholder="message" />

      <span v-if="seen">Now you see me</span>
      <br />
      <v-btn small color="primary">Primary</v-btn>
      <!-- <ul>
      <li :key="x" v-for="x in todos">{{ x.text }}</li>
      </ul>-->

      <button v-on:click="reverseMessage">Reverse Message</button>
      <!-- <template>
      <ListItem :todos="todos" :propB=propb />
      </template>-->
    </div>
    <template>
      <ListItem :todos="todos" :propB="propb" />
    </template>
  </div>
</template>





<script>
import ListItem from "~/components/list-item";
export default {
  // middleware: ['auth'],
  components: { ListItem },
  data: () => {
    return {
      propb: "Nitin",
      message: "Hello Vue.js!",
      seen: false,
      todos: [
        { text: "Learn JavaScript" },
        { text: "Learn Vue.js" },
        { text: "Build Something Awesome" },
      ],
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split("").reverse().join("");
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<style scoped>
.login-button {
  border: 0;
}
</style>