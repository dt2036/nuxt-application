<template>
  <div class="user">


    <h3>Name :{{ name }}</h3>
    <h4>UserName :{{ username }}</h4>
    <p>Email : {{ email }}</p>

    <p>
      <NuxtLink to="/bookmyshow">
       Back
      </NuxtLink>
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
         middleware: ['auth'],
  validate ({ params }) {
    return !isNaN(+params.id)
  },
//   async asyncData ({ params, error }) {
//       const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${+params.id}`)
//       return data      
//   }

   async asyncData({ $auth, $axios, params }) {
     var  data   = (await $axios.get(`api/bookmyshow/list/GetById/${+params.id}`)).data;
     debugger;
    return data  
    
  },
}
</script>

<style >
.user {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
</style>
