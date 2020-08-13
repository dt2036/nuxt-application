<template>
  <div>
    <div>
      <div>
        <b-button id="show-btn" @click="showModal">Open Modal</b-button>

        <b-modal ref="my-modal" no-close-on-backdrop title="Dose Add">
          <v-card-text>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="firstName"
                    :rules="[rules.required]"
                    label="First Name"
                    maxlength="20"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="lastName"
                    :rules="[rules.required]"
                    label="Last Name"
                    maxlength="20"
                    required
                  ></v-text-field>
                </v-col>

                <v-spacer></v-spacer>
                <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                  <v-btn block :disabled="!valid" color="green" @click="validate">Register</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </b-modal>
      </div>
      <v-data-table
        :headers="headers"
        :items="items"
        sort-by="calories"
        no-data-text="No data found"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <h2>Dose List</h2>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-form ref="caseForm" :disabled="isdisabled" v-model="valid" lazy-validation>
              <v-dialog v-model="dialog" max-width="700px">
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
import axios from 'axios'
export default {
  // middleware: ['auth'],
  middleware: ["auth"],

  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
    items: [
      { name: "test1", type: "Tab", description: "1 tab morning" },
      { name: "test2", type: "Syrup", description: "3 Spoon morning" },
    ],
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
        text: "Dose Name",
        align: "left",
        value: "name",
      },
      { text: "Type", align: "left", value: "type" },
      { text: "Description", align: "left", value: "description" },
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
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
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
  },
  // async asyncData({ $auth,$axios, params }) {
  //   debugger;
  //   // let result = (await $axios.get(`api/case/GetAll`)).data;
  //   let result = (await $axios.get(`api/case/GetById/${params.name}`)).data;

  //   return {
  //     caseList: result.caseList,
  //   };
  // },

  async asyncData({ $auth, $axios, params }) {
    var data = (await $axios.get(`api/case/GetById/${params.name}`)).data;
    debugger;
    return data;
  },
};
</script>
