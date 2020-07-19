<template>
  <div>
    <b-alert show variant="success">
      You should see this page without need to authentication! - {{ title }}
    </b-alert>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  options: {
    auth: false
  },
  async asyncData({ $auth, axios, params }) {
            console.log($auth.loggedIn)
    return { title: $auth.loggedIn ? "Logged INsss" : "Not Logged IN"}
  }
}
</script>
