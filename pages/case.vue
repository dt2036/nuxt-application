<template>
  <div>
    <div>
      <v-data-table
        :headers="headers"
        :items="caseList"
        sort-by="calories"
        no-data-text="No data found"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <h2>Case List</h2>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-form ref="caseForm" :disabled="isdisabled" v-model="valid" lazy-validation>
              <v-dialog v-model="dialog" max-width="700px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Case</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.name"
                            :rules="[rules.required]"
                            label="Case name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.gender"
                            :rules="[rules.required]"
                            label="Gender"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.age"
                            :rules="[rules.required]"
                            label="Age"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field                           
                            v-model="editedItem.address"
                            :rules="[rules.required]"
                            label="Address"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.city"
                            :rules="[rules.required]"
                            label="City"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.country"
                            :rules="[rules.required]"
                            label="Country"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.status"
                            :rules="[rules.required]"
                            label="Status"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" :disabled="!valid" @click="close">Cancel</v-btn>
                    <v-btn color="green" :disabled="!valid" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-form>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="viewItem(item)">fa fa-eye</v-icon>
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
    caseList: [],
    isEdit: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      gender: "",
      age: "",
      address: "",
      city: "",
      country: "",
      status: "",
    },
    defaultItem: {
      name: "",
      gender: "",
      age: "",
      address: "",
      city: "",
      country: "",
      status: "",
    },
    headers: [
      {
        text: "Case Name ",
        align: "left",
        value: "name",
      },
      { text: "Gender", align: "left", value: "gender" },
      { text: "Age", align: "left", value: "age" },
      { text: "Address", align: "left", value: "address" },
      { text: "City", align: "left", value: "city" },
      { text: "Country", align: "left", value: "country" },
      { text: "Status", align: "left", value: "status" },
      { text: "Last Updated On", align: "left", value: "createdOn" },
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      if (this.editedIndex === -1) {
        return "New Case";
      } else if (this.editedIndex === 300) {
        return "View Case";
      } else {
        return "Edit Case";
      }
      //  return this.editedIndex === -1 ? "New Case" : "Edit Case";
    },
  },

  methods: {
    //  async validate() {
    //   if (this.$refs.caseForm.validate()) {
    //     debugger;
    //     // submit form to server/API here...
    //   }
    // },
    async editItem(item) {
      this.isEdit = true;
      let result = (await this.$axios.get(`api/case/GetById/${item.name}`))
        .data;
      this.dialog = true;
      this.editedIndex = this.caseList.indexOf(item);
      this.editedItem = result.caseData;
    },

    async editSaveClick() {
      //  uuid.v1();
      console.log(uuidv4());

      let data = this.editedItem;
      try {
        await this.$axios.put("api/case/Update", data);

        this.close();
      } catch (error) {}
    },

    viewItem(item) {
      this.isdisabled = true;
      this.editedIndex = 300;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
     this.$confirm({
          message: `Are you sure delete case?`,
          button: {
            no: 'No',
            yes: 'Yes'
          },          
          callback: confirm => {
            if (confirm) {
     
        this.$axios.delete(`api/case/Delete/${item.name}`);
        this.close();
        this.$router.go(0);
    
            }
          }
        }
      )
      // try {
      //   await this.$axios.delete(`api/case/Delete/${item.name}`);
      //   this.close();
      //   this.$router.go(0);
      // } catch (error) {}
    },

    close() {
      this.valid = false;
      this.isdisabled = false;
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

   save() {
      if (this.$refs.caseForm.validate()) {
        if (this.isEdit) {
          let data = this.editedItem;
          try {
            //if you want  validation work then remove async 
            this.$axios.put("api/case/Update", data);
            this.$router.go(0);
            this.close();
          } catch (error) {}
        } else {
          console.log(uuidv4());

          let data = this.editedItem;
          try {
            this.$axios.post("api/case/Create", data);

            this.close();
            this.$router.go(0);
          } catch (error) {}
        }
      }
    },
  },
  async asyncData({ $auth, $axios, params }) {
    let result = (await $axios.get(`api/case/GetAll`)).data;
    return {
      caseList: result.caseList,
    };
  },
};
</script>
