<template>
    <div>
        <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
</template>

<script>
    export default {
        middleware: ['auth'],
        data() {
            return {
                fields: ['first_name', 'last_name', 'age'],
                
            }
        },

        async asyncData({ $auth, $axios, params }) {
            let result = (await $axios.get("api/administration/users")).data
            return { items: result}
        }
    }
</script>