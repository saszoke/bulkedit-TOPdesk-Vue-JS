<template>
  <div>
    <v-stepper
        v-model="e6"
        vertical
      >
        <v-stepper-step
          :complete="e6 > 1"
          step="1"
        >
          Enter credentials
          <small>Summarize if needed</small>
        </v-stepper-step>

        <v-stepper-content step="1">

            <div>
              <v-text-field
                label="API username"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
              <v-text-field label="Application password"></v-text-field>
            </div>
          <v-btn
            color="primary"
            @click="e6 = 2"
          >
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
          :complete="e6 > 2"
          step="2"
        >
          Upload Incident Selection
        </v-stepper-step>

        <v-stepper-content step="2">
          <div>
              <v-file-input
                accept=".xlsx"
                label="File input"
                v-model="xlsInput"
              ></v-file-input>
          </div>
          <v-btn
            color="primary"
            @click="e6 = 3"
          >
            Continue
          </v-btn>
          <v-btn text @click="e6 = 1">
            Back
          </v-btn>
        </v-stepper-content>

        <v-stepper-step           
          :complete="e6 > 3"
          step="3">
          Choose fields to be updated
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-row class="ma-5" v-for="possibility in possibilities" :key="possibility">
            <v-checkbox
              v-model="enabled"
              hide-details
            ></v-checkbox>
            <v-text-field
              :disabled="!enabled"
              :label="possibility"
            ></v-text-field>
          </v-row>
          <v-btn
            color="primary"
            @click="()=>{
              e6 = 4
              bulkEdit()
            }"
          >
            Update
          </v-btn>
          <v-btn text @click="e6 = 2">
            Back
          </v-btn>
        </v-stepper-content>
      </v-stepper>





    <v-progress-linear
      color="light-blue"
      height="30"
      :value=value
      striped
    ><strong>{{ Math.ceil(value) }}%</strong></v-progress-linear>


    <div class="d-flex justify-center">
      <v-btn
        width="200px"
        class="ma-3 text-center"
        outlined
        large
        color="primary"
        v-if="value === 100"
        @mouseenter="()=>{
          completeText = 'New Edit'
          completeIcon = 'mdi-pencil-outline'
        }"
        @mouseleave="()=>{
          completeText = 'Update Completed'
          completeIcon = 'mdi-check-all'
        }"
        @click="()=>{
          resetForm()
        }"
      >
        <v-icon left>{{completeIcon}}</v-icon>
        {{completeText}}
      </v-btn>
    </div>
    
  </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
      return {
        e6: 1,
        apiUser: '',
        apiPassword: '',
        xlsInput: {},
        interval: {},
        value: 0,
        completeText: "Update Completed",
        completeIcon: "mdi-check-all",
        enabled: false,
        possibilities: ["caller","branch", "short description", "category", "subcategory", "object", "operator", "operator group", "processing status", "supplier"],
        rules: [
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ]
      }
    },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {},

  methods: {
    resetForm: function(){
      this.e6 = 1
      this.xlsInput = {}
      this.value = 0
    },

    bulkEdit: function(){
      this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 100)
      }
      this.value += 10
    }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
