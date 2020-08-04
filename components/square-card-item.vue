


<template>
  <div>
    <v-sheet grid-list-md class="mx-auto" elevation="1">
      <v-slide-group v-model="model" class="pa-4">
        <v-slide-item v-for="item in images" :key="item" :src="item.src">
          <v-card class="ma-4">
            <v-img height="300" width="300" :src="item.src" @click="redirectImageData(item)">
              <v-row class="fill-height" align="end" justify="center">
                <v-card-title>{{ item.name }}</v-card-title>
              </v-row>
            </v-img>
            <v-card-text class="text--primary">
              <div class="display-1 white--cyan">{{ item.name }}</div>

              <!-- <div class="text-wrap">{{ item.description }}</div> -->
            </v-card-text>
            <v-col cols="8">
              <v-rating
                v-model="rating"
                background-color="red"
                color="yellow accent-4"
                dense
                full-icon="mdi-heart"
                half-icon="mdi-heart-half-full"
                empty-icon="mdi-heart-outline"
                hover
                size="30"
              ></v-rating>
            </v-col>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
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
    rating: 3,
    currentSelectedItemData: {},
  }),
  methods: {
    Test(data) {
      console.log("Image Selected." + data.src);
      debugger;
      this.dialog = true;
      this.currentSelectedItemData = data;
    },
    redirectImageData(data) {
      console.log(data.name);
      this.$router.push({ path: "/showdata/" + data.name });
      //  this.$router.push({path: '/userdata/' + 1});
    },
  },
};
</script>

<style>
#rounded-card {
  border-radius: 50%;
  min-height: 200px;
  min-width: 200px;
  padding: 75px;
}
</style>
