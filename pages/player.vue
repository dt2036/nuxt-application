<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12" sm="6" md="2">
          <v-autocomplete
            :items="teamDDData"
            v-model="filterName"
            color="white"
            item-text="name"
            label="Team Name"
          ></v-autocomplete>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-btn color="primary" dark @click="filterClick">Filter</v-btn>
          <v-btn color="warning" dark @click="filterClearClick">Clear</v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="playerList"
        sort-by="calories"
        no-data-text="No data found"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <h2>Player List</h2>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-form ref="teamForm" :disabled="isdisabled" v-model="valid" lazy-validation>
              <v-dialog v-model="dialog" max-width="700px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add Match</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <!-- {{editedItem}} -->
                    <v-container>
                      <!-- {{teamDDData}} -->
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.playerName"
                            :rules="[rules.required]"
                            label="Player Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-autocomplete
                            :items="teamDDData"
                            v-model="editedItem.teamName"
                            :rules="[rules.required]"
                            color="white"
                            item-text="name"
                            label="Team Name"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.skill"
                            :rules="[rules.required]"
                            label="Skill"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.age"
                            :rules="[rules.required]"
                            label="Age"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
                    <v-btn color="green" :disabled="!valid" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-form>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<style >
.login-button {
  border: 0;
}
</style>

<script>
// const uuid = require('uuid');
import { v4 as uuidv4 } from "uuid";
export default {
  // middleware: ['auth'],
  middleware: ["auth"],

  data: () => ({
    states: [
      { name: "Florida", abbr: "FL", id: 1 },
      { name: "Georgia", abbr: "GA", id: 2 },
    ],
    teamDDData: [],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },

    valid: true,
    dialog: false,
    filterName: "",
    isdisabled: false,
    playerList: [],
    isEdit: false,
    editedIndex: -1,
    editedItem: {
      TournamentId: "",
      SK: "",
      playerName: "",
      teamName: "",
      skill: "",
      age: null,
    },
    headers: [
      {
        text: "Player Name",
        align: "left",
        value: "playerName",
      },
      { text: "Team Name", align: "left", value: "teamName" },
      { text: "Skill", align: "left", value: "skill" },
      { text: "Age", align: "left", value: "age" },
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      if (this.isEdit) {
        return "Edit Player";
      } else {
        return "Add Player";
      }
    },
  },

  mounted() {
    this.loadDDData();
  },

  methods: {
    async loadDDData() {
      try {
        let result = (await this.$axios.get(`api/team/GetTeamDropdownData`))
          .data;
        var filtered = result.teamList.filter(function (el) {
          return el.teamName != undefined || el.teamName != null;
        });
        filtered.forEach((item) => {
          item.name = item.teamName;
        });
        this.teamDDData = filtered;
      } catch (error) {}
    },

    async editItem(item) {
      this.isEdit = true;
      let result = (
        await this.$axios.get(
          `api/player/GetById/${item.sk}/${item.tournamentId}`
        )
      ).data;

      this.dialog = true;
      this.editedItem = result.playerData;
    },

    async editSaveClick() {
      console.log(uuidv4());
      let data = this.editedItem;
      try {
        await this.$axios.put("api/player/Update", data);
        this.close();
      } catch (error) {}
    },

    async deleteItem(item) {
      try {
        await this.$axios.delete(`api/player/Delete/${item.sk}`);
        this.close();
        this.$router.go(0);
      } catch (error) {}
    },

    close() {
      // this.valid = false;
      this.isdisabled = false;
      this.dialog = false;
    },

    async filterClick() {
      console.log("Filter Applied.");
      var temp = {
        teamName: this.filterName,
      };
      try {
        let result = await this.$axios.post("api/player/Filter", temp);
        this.playerList = result.data.playerList;
      } catch (error) {}
    },

    async filterClearClick() {
      try {
        let result = (await this.$axios.get(`api/player/GetAll`)).data;
        debugger;
        this.filterName = "";
        this.playerList = result.playerList;
      } catch (error) {}
    },

    async save() {
      if (this.$refs.teamForm.validate()) {
        if (this.isEdit) {
          let data = this.editedItem;
          data.TournamentId = "555";
              data.SK = data.sk;
                data.sK = data.sk;
          await this.$axios
            .put("api/player/Update", data)
            .then((res) => {
              this.$toast.success(res.data);
              this.close();
               this.$nuxt.refresh();
              // this.$router.go(0);
            }).catch((error) => {
              this.$toast.error(error.response.data);
            });
        } else {
          let data = this.editedItem;
          data.TournamentId = "555";
           data.tournamentId = "555";
          data.SK = "player-" + uuidv4();
               data.sK =  "player-" + uuidv4();
                data.sk =  "player-" + uuidv4();
          await this.$axios
            .post("api/player/Create", data)
            .then((res) => {
              this.$toast.success(res.data);
              this.close();
              this.$router.go(0);
            })
            .catch((error) => {
              this.$toast.error(error.response.data);
            });
        }
      }
    },
  },
  async asyncData({ $auth, $axios, params }) {
    let result = (await $axios.get(`api/player/GetAll`)).data;

    return {
      playerList: result.playerList,
    };
  },
};
</script>
