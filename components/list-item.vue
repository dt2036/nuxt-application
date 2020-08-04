<template>
  <!-- <div>
  <div class="row">-->
  <div>
    <template>
      <div class="product-card-container col-6 col-sm-4 col-md-3">
        <ul>{{testing}}
        <li :key="x" v-for="x in todos"> {{propB}}  {{ x.text }}</li>
        </ul>
       
      </div>
    </template>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
    props: {
     todos: [],
     propB: String
   },
     data: () => {
    return {
     
      testing: "Yes",
      
    };
  },
};
</script>

<style>
.btn-black {
  background-color: black;
  color: white;
}
</style>
