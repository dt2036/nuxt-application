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
  // validate ({ params }) {
  //   return !isNaN(+params.name)
  // },


   async asyncData({ $auth, $axios, params }) {
       debugger;
       console.log(params);
     var  data   = (await $axios.get(`api/bookmyshow/list/GetById/4`)).data;
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
