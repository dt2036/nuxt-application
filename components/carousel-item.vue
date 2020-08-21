


<template>
  <div>
  <!-- <v-row no-gutters>
      <v-col :md="1"
        v-for="n in images"
        :key="n"
        cols="sm"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
      {{n.name}}
        </v-card>
      </v-col>
    </v-row> -->

    <v-carousel hide-delimiters height="300" show-arrows-on-hover cycle>
      <v-carousel-item v-for="(item, i) in images" :key="i" :src="item.src" @click="Test(item)">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3 white--text">{{ item.name }}</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <div class="text-center ma-xs-5">
      <v-dialog v-model="dialog" width="500">      
        <v-card>
          <v-card-title class="headline grey lighten-2">{{currentSelectedItemData.name}}</v-card-title>
        
          <v-card-text>{{currentSelectedItemData.description}}</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"  @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],

  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    dialog: false,
    currentSelectedItemData: {},
  }),
  methods: {
    Test(data) {
      console.log("Image Selected." + data.src);
      debugger;
      this.dialog = true;
      this.currentSelectedItemData = data;
    },
  },
};
</script>

<style>
.btn-black {
  background-color: black;
  color: white;
}
</style>
