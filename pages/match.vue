<template>
  <div>
    <div>
      <v-data-table
        :headers="headers"
        :items="matchList"
        sort-by="calories"
        no-data-text="No data found"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <h2>Match List</h2>
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
                          <v-autocomplete
                            :items="teamDDData"
                            v-model="editedItem.teamA"
                              :rules="[rules.required]"
                            color="white"
                            item-text="name"
                            label="Team A"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-autocomplete
                            :items="teamDDData"
                            v-model="editedItem.teamB"
                              :rules="[rules.required]"
                            color="white"
                            item-text="name"
                            label="Team B"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.ticketSold"
                            :rules="[rules.required]"
                            label="Ticket Sold"
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
    isdisabled: false,
    matchList: [],
    isEdit: false,
    editedIndex: -1,
    editedItem: {
      TournamentId: "",
      SK: "",
      teamA: "",
      teamB: "",
      ticketSold: 0,
    },
    headers: [
      {
        text: "Team A",
        align: "left",
        value: "teamA",
      },
      { text: "Team B", align: "left", value: "teamB" },
      { text: "Ticket Sold", align: "left", value: "ticketSold" },

      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      if (this.isEdit) {
        return "Edit Match";
      } else {
        return "Add Match";
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
          `api/match/GetById/${item.sk}/${item.tournamentId}`
        )
      ).data;

      this.dialog = true;
      this.editedItem = result.teamData;
    },

    async editSaveClick() {
      console.log(uuidv4());
      let data = this.editedItem;
      try {
        await this.$axios.put("api/match/Update", data);
        this.close();
      } catch (error) {}
    },

    getList(item) {
      try {
        let result = this.$axios.get(`api/team/GetTeamDropdownData`).data;

        return {
          matchList: result.matchList,
        };
      } catch (error) {}
    },

    async deleteItem(item) {
      try {
        await this.$axios.delete(`api/match/Delete/${item.sk}`);
        this.close();
        this.$router.go(0);
      } catch (error) {}
    },

    close() {
      // this.valid = false;
      this.isdisabled = false;
      this.dialog = false;
    },

    async save() {
      if (this.$refs.teamForm.validate()) {
        if (this.isEdit) {
          let data = this.editedItem;

          data.TournamentId = "555";
          // data.SK = "match-" + uuidv4();
          try {
            await this.$axios.put("api/match/Update", data);
            this.close();
             this.$nuxt.refresh();
            // this.$router.go(0);
          } catch (error) {}
        } else {
          console.log(uuidv4());

          let data = this.editedItem;
          data.TournamentId = "555";
          data.SK = "match-" + uuidv4();
          try {
            await this.$axios.post("api/match/Create", data);

            this.close();
            this.$router.go(0);
          } catch (error) {}
        }
      }
    },
  },
  async asyncData({ $auth, $axios, params }) {
    let result = (await $axios.get(`api/match/GetAll`)).data;

    return {
      matchList: result.matchList,
    };
  },
};
</script>
