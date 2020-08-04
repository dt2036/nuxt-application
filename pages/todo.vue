<template>
   <div>
       <h3>To-Do List</h3>
        <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
</template>



<script>
    // import ProductItem from "~/components/product-item";
    export default {
      
    //  middleware: ['auth'],
        data() {
            return {
                 fields: ['description', 'priority', 'isCompleted'],
            };
        },
       async asyncData({ $auth, $axios, params }) {
             let result = (await $axios.get("api/todotask/todos")).data;
            // debugger;
            return { items: result}
        }
    };
</script>