<template>
  <div>
     <v-sheet grid-list-md class="mx-auto" elevation="1">
      <v-slide-group class="pa-4" show-arrows>
        <v-slide-item v-for="item in images" :key="item"  >       
          <v-img id="rounded-card"
              height="200"
               width="200"
              :src="item.src"
            >
            
            </v-img>
            
            <!-- <v-col v-text="item.name"></v-col>
     {{item.name}} -->
       
       
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
};
</script>

<style>
#rounded-card {
  border-radius: 50%;
  min-height: 200px;
  min-width: 200px;
  padding: 75px;
  margin-right: 36px;
}
</style>
