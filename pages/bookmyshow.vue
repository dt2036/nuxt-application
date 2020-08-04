<template>
  <div>
    <div>
      <h2>Users</h2>
      <ul class="users">
        <li v-for="user in usersList" :key="user.id">
          <!-- <v-btn text color="primary">
            <router-link :to="'/userdata/'+user.id" tag="button">{{ user.name }}</router-link>
          </v-btn> -->
          <v-btn  color="info" @click="buttonclick(user)">{{ user.name }}</v-btn>
          <!-- 
        <NuxtLink :to="'/userdata/'+user.id">
          {{ user.name }}
          </NuxtLink>-->
        </li>
      </ul>
      <div>
        <CarouselItem :images="items" />
      </div>
      <v-divider></v-divider>
      <div>
        <CircleCardItem :images="listItem" />
      </div>
      <v-divider></v-divider>
      <div>
        <SquareCardItem :images="listItem" />
      </div>
    </div>
    <v-divider></v-divider>
    <h1>Tree View</h1>
    <v-treeview dense :items="itemsList"></v-treeview>
    <v-divider></v-divider>
    <h1>Tool Trip</h1>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">Left</v-btn>
      </template>
      <span>Left tooltip</span>
    </v-tooltip>
    <v-divider></v-divider>
    <h1>Time Line</h1>
    <v-timeline align-top dense>
      <v-timeline-item color="pink" small>
        <v-row class="pt-1">
          <v-col cols="3">
            <strong>10 AM</strong>
          </v-col>
          <v-col>
            <strong>Call with Ma'am</strong>
            <div class="caption">Side bar menu</div>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item color="teal lighten-3" small>
        <v-row class="pt-1">
          <v-col cols="3">
            <strong>11 AM</strong>
          </v-col>
          <v-col>
            <strong>Virtual scroller</strong>
            <div class="caption mb-2">Scroll bar</div>
            <v-avatar>
              <v-img
                src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
              ></v-img>
            </v-avatar>
            <v-avatar>
              <v-img
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
              ></v-img>
            </v-avatar>
            <v-avatar>
              <v-img
                src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item color="pink" small>
        <v-row class="pt-1">
          <v-col cols="3">
            <strong>11:30 AM</strong>
          </v-col>
          <v-col>
            <strong>Tree View</strong>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item color="teal lighten-3" small>
        <v-row class="pt-1">
          <v-col cols="3">
            <strong>11:55 AM</strong>
          </v-col>
          <v-col>
            <strong>Tool trip And Timeline</strong>
            <div class="caption">Web App</div>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
    <v-divider></v-divider>
    <h1>Tabs</h1>
    <v-tabs background-color="white" color="deep-purple accent-4" right>
      <v-tab>Test 1</v-tab>
      <v-tab>Test 2</v-tab>
      <v-tab>Test 3</v-tab>

      <v-tab-item v-for="n in 3" :key="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="4">
              <v-img
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
    <v-divider></v-divider>
    <h1>Table</h1>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1"></v-data-table>
    <!-- <sidebar-menu :menu="menu">
      <i class="fa fa-chevron-right" slot="dropdown-icon"></i>
      <i class="fa fa-arrows-h" slot="toggle-icon"></i>
    </sidebar-menu>-->
    <v-divider></v-divider>
    <h1>Spark line Chart</h1>
    <v-sparkline
      :fill="fill"
      :gradient="gradient"
      :line-width="width"
      :padding="padding"
      :smooth="radius || false"
      :value="value"
      auto-draw
    ></v-sparkline>
    <v-divider></v-divider>
    <h1>Navigation Drawer</h1>
    <v-card>
      <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>John Leider</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in drawerList" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<style scoped>

</style>

<script>
import CarouselItem from "~/components/carousel-item";
import CircleCardItem from "~/components/circle-card-item";
import SquareCardItem from "~/components/square-card-item";
import { SidebarMenu } from "vue-sidebar-menu";
import "font-awesome/scss/font-awesome.scss";
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default {
  // middleware: ['auth'],
  middleware: ["auth"],
  components: { CarouselItem, CircleCardItem, SquareCardItem, SidebarMenu },
  data: () => ({
    mini: true,
    fill: true,
    gradient: gradients[4],
    gradients,
    padding: 8,
    radius: 10,
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    width: 2,
    model: null,
  }),
  methods: {
    buttonclick(user) {
       debugger;
      // /userdata/'+user.id
     this.$router.push({path: '/userdata/' + user.id});
    },
  },

  async asyncData({ $auth, $axios, params }) {
    let result = (await $axios.get(`api/bookmyshow/list`)).data;
    return {
      drawerList: result.drawerList,
      itemsList: result.itemsList,
      listItem: result.listItem,
      items: result.items,
      desserts: result.desserts,
      headers: result.headers,
      menu: result.menu,
      usersList: result.usersList,
    };
  },
};
</script>


