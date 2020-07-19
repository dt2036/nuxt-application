<template>
    <!-- <div>
    <div class="row">-->
    <div>
        <template>
            <div class="product-card-container col-6 col-sm-4 col-md-3">
                <div class="products" @mouseover="showDetail = true" @mouseleave="showDetail = false">
                    <div class="product__left">
                        <img :src="require(`../assets/${item.src}`)" class="product__image" />
                    </div>
                    <div class="product__right">
                        <div class="product__data">
                            <a href="#" class="product__name">
                                <span>{{item.ProductName}}</span>
                            </a>
                            <div class="product__info">
                                <div class="product__price notranslate">
                                    <span class="product__price-actual">{{item.price}}</span>
                                </div>
                                <p class="product__free-shipping">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24"
                                         height="20"
                                         viewBox="0 0 24 20"
                                         aria-label="Free shipping"
                                         role="presentation"
                                         class="icon-base product__free-shipping-flag truck">
                                        <title lang="es">Shipping</title>
                                        <g fill="#888888" stroke="#888888">
                                            <g xmlns="http://www.w3.org/2000/svg"
                                               transform="matrix(0.0374101,0,0,0.0374101,0,0)">
                                                <path d="M624,352L608,352L608,243.9C608,231.2 602.9,219 593.9,210L494,110.1C485,101.1 472.8,96 460.1,96L416,96L416,48C416,21.5 394.5,0 368,0L48,0C21.5,0 0,21.5 0,48L0,368C0,394.5 21.5,416 48,416L64,416C64,469 107,512 160,512C213,512 256,469 256,416L384,416C384,469 427,512 480,512C533,512 576,469 576,416L624,416C632.8,416 640,408.8 640,400L640,368C640,359.2 632.8,352 624,352ZM160,464C133.5,464 112,442.5 112,416C112,389.5 133.5,368 160,368C186.5,368 208,389.5 208,416C208,442.5 186.5,464 160,464ZM480,464C453.5,464 432,442.5 432,416C432,389.5 453.5,368 480,368C506.5,368 528,389.5 528,416C528,442.5 506.5,464 480,464ZM560,256L416,256L416,144L460.1,144L560,243.9L560,256Z"
                                                      style="fill-rule: nonzero;" />
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Free shipping to store</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-more-info" v-if="showDetail">
                    <div class>
                        <span class="btn btn-black">Only</span>
                        <button class="btn btn-success">Add to cart</button>
                        <div>
                            <span>Free shipping to store</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
    <!-- </div>
    </div>-->
</template>

<script>
export default {
  layout: "product-item",
  middleware: ["auth"],
  props: {
    item: Object
  },
  data() {
    return {
      showDetail: false
    };
  },
  methods: {
    mouseOver: function() {
      this.showDetail = true;
    }


  }
};
</script>

<style>
    .btn-black {
        background-color: black;
        color: white;
    }
</style>
