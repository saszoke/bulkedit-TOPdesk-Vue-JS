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
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
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
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
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
          step="3"
        >
          Confirm incident column
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
          <v-btn
            color="primary"
            @click="e6 = 4"
          >
            Continue
          </v-btn>
          <v-btn text @click="e6 = 2">
            Back
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 4" step="4">
          Choose fields to be updated
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
          <v-btn
            color="primary"
            @click="e6 = 5"
          >
            Update
          </v-btn>
          <v-btn text @click="e6 = 3">
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

        class="ma-3 text-center"
        outlined
        large
        color="primary"
        @mouseenter="()=>{
          completeText = 'New Edit'
          completeIcon = 'mdi-pencil-outline'
        }"
        @mouseleave="()=>{
          completeText = 'Update Completed'
          completeIcon = 'mdi-check-all'
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
        interval: {},
        value: 0,
        completeText: "Update Completed",
        completeIcon: "mdi-check-all"
      }
    },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  },
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
