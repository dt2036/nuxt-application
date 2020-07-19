<template>
    <div>
        <div class="col-lg-12">
            <template v-for="item in items">
                <ProductItem :key="item.name" :item="item" />
            </template>
            <v-pagination v-model="page"
                          :length="length"
                          @input="next"></v-pagination>
        </div>

    </div>
</template>



<script>
    import ProductItem from "~/components/product-item";

    export default {
        components: { ProductItem },
        computed: {
            length() {
                return this.rowsPerPage ? Math.ceil(3 / this.rowsPerPage) : 0
            }
        },
        data() {
            return {
                page: 1,
                rowsPerPage: 1,
                products: [],
                limit: 1,
                items: []
            };
        },
        methods: {
            async next(page) {
                let result = (await this.$axios.get(`api/product/products/${page}/${this.rowsPerPage}`)).data
                this.items = result.Items;
            },
        },
        async asyncData({ $auth, $axios, params }) {
            let result = (await $axios.get(`api/product/products/1/1`)).data
            return { items: result.Items }
        }
    };
</script>