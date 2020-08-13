<template>
  <div>
    <div>
      <v-data-table
        :headers="headers"
        :items="teamList"
        sort-by="calories"
        no-data-text="No data found"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <h2>Team List</h2>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-form ref="teamForm" :disabled="isdisabled" v-model="valid" lazy-validation>
              <v-dialog v-model="dialog" max-width="700px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add Team</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <!-- {{editedItem}} -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.teamName"
                            :rules="[rules.required]"
                            label="Team name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.ranks"
                            :rules="[rules.required]"
                            label="Rank"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.slogan"
                            :rules="[rules.required]"
                            label="Slogan"
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
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },

    valid: true,
    dialog: false,
    isdisabled: false,
    teamList: [],
    isEdit: false,
    editedIndex: -1,
    editedItem: {
      TournamentId: "",
      SK: "",
      teamName: "",
      ranks: "",
      slogan: "",
    },
    headers: [
      {
        text: "Team Name ",
        align: "left",
        value: "teamName",
      },
      { text: "Rank", align: "left", value: "ranks" },
      { text: "Team Slogan", align: "left", value: "slogan" },

      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      if (this.editedIndex === -1) {
        return "Add Team";
      } else if (this.editedIndex === 300) {
        return "View Team";
      } else {
        return "Edit Team";
      }
    },
  },

  methods: {
    async editItem(item) {
      this.isEdit = true;
      let result = (
        await this.$axios.get(
          `api/team/GetById/${item.sk}/${item.tournamentId}`
        )
      ).data;

      this.dialog = true;
      this.editedItem = result.teamData;
    },

    async editSaveClick() {
      let data = this.editedItem;
      try {
        await this.$axios.put("api/team/Update", data);
        this.close();
      } catch (error) {}
    },

    async deleteItem(item) {
      try {
        await this.$axios.delete(`api/team/Delete/${item.sk}`);
        this.close();
        this.$router.go(0);
      } catch (error) {}
    },

    close() {
      this.valid = false;
      this.isdisabled = false;
      this.dialog = false;
    },

    async save() {
      if (this.$refs.teamForm.validate()) {
        if (this.isEdit) {
          let data = this.editedItem;

          data.TournamentId = "555";
          // data.SK = "team-" + uuidv4();
          try {
            await this.$axios.put("api/team/Update", data);
            this.$router.go(0);
            this.close();
          } catch (error) {}
        } else {
          console.log(uuidv4());

          let data = this.editedItem;
          data.TournamentId = "555";
          data.SK = "team-" + uuidv4();
          try {
            await this.$axios.post("api/team/Create", data);

            this.close();
            this.$router.go(0);
          } catch (error) {}
        }
      }
    },
  },
  async asyncData({ $auth, $axios, params }) {
    let result = (await $axios.get(`api/team/GetAll`)).data;

    return {
      teamList: result.teamList,
    };
  },
};
</script>
