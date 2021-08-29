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
          Enter API details
          <small v-if="apiUser != ''">API user: {{apiUser}}</small>
        </v-stepper-step>

        <v-stepper-content step="1">

            <v-form
              v-model="stepOneDone"
            >
              <v-text-field 
                label="TOPdesk URL (eg.: https://mycompany.topdesk.net)" 
                v-model="TOPdeskurl"
                :rules="URLrules"
                ></v-text-field>
              <v-text-field
                label="API username"
                :rules="rules"
                hide-details="auto"
                v-model="apiUser"
              ></v-text-field>
              <v-text-field 
                label="Application password" 
                v-model="apiPassword"
                :rules="PWrules"
                ></v-text-field>
            </v-form>
          <v-btn
            color="primary"
            :disabled="!stepOneDone"
            @click="validate()"
          >
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
          :complete="e6 > 2"
          step="2"
        >
          Upload Incident Selection
          <small v-if="xlsInput != null">File: {{xlsInput.name}}</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-form
            v-model="stepTwoDone"
            >
              <v-file-input
                accept=".xlsx"
                label="File input"
                v-model="xlsInput"
                :rules="ExcelRules"
                @change="(e)=>{
                  if(e != null && e.name.includes('.xlsx')){
                    processExcel()
                  }
                }"
              ></v-file-input>
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
                <v-select
                  :items="items"
                  label="Incident column"
                  :rules="ColumnRule"
                  v-model="selected"
                ></v-select>
              </v-col>
          </v-form>
          <v-btn
            :disabled="!stepTwoDone"
            color="primary"
            @click="()=>{
              e6 = 3
            }"
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
          <small v-if="possibilities.some(possibility => possibility.check == true) == true">Changes: {{checked.join()}}</small>
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-row class="ma-5" v-for="possibility in possibilities" :key="possibility.name">
            <v-checkbox
              v-model="possibility.check"
              hide-details
            ></v-checkbox>
            <v-text-field
              :disabled="!possibility.check"
              :label="possibility.name"
              v-model="possibility.value"
            ></v-text-field>
          </v-row>
          <v-btn
            :loading="btnLoading"
            color="primary"
            :disabled="checked == ''"
            @click="()=>{
              this.excelObject.forEach(row =>{
                    this.incidents.push(row[selected])
                  })
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

      <v-btn
        width="200px"
        class="ma-3 text-center"
        outlined
        large
        color="primary"
        v-if="value == 100"
        @click="()=>{
          checkDialog = true
        }"
      >
        <v-icon left>mdi-eye-check-outline</v-icon>
        Check Results
      </v-btn>
    </div>


    <div class="text-center">
      <v-snackbar
        class="text-center"
        v-model="snackbar"
        success
        :timeout="timeout"
        color="primary"
        text
        
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="primary"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>



    <v-dialog
      v-model="dialog"
      
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">
          Bulk edit confirmation
        </v-card-title>

        <v-card-text>
          You are about to update {{incidents.length}} incidents. The following changes will be applied:

          <v-alert
            color="info"
            text
            
          >
            <div v-for="change in checkedChanges" :key="change.name" >
              <div>

                <h5>
                  {{change.name}}
                </h5>
              </div>

              <div>
                {{change.value}}
              </div>

              <v-divider
                class="my-4 info"
                style="opacity: 0.22"
              ></v-divider>
            </div>
          </v-alert>
              

          Is this correct, would you like to proceed? 
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="()=>{
              dialog = false
              updateGo()
            }"
          >
            Yes
          </v-btn>

          <v-btn
            color="red"
            text
            @click="()=>{
              dialog = false
              resetForm()
            }"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="checkDialog"
      
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">
          Results
        </v-card-title>

        <v-card-text>
          <v-alert
            color="info"
            text
            
          >
            <div v-for="incident in checkList" :key="incident['Incident Number']">
              <div>
                {{incident['Incident Number']}} - {{incident['Status']}}
                <v-tooltip right v-if="incident['Message']">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      icon
                    >
                      <v-icon
                        color="primary lighten-1"
                      >
                        mdi-information-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>{{incident['Message']}}</span>
                </v-tooltip>
              </div>

              <v-divider
                class="my-4 info"
                style="opacity: 0.22"
              ></v-divider>
            </div>
          </v-alert>

        </v-card-text>

        <v-card-actions>

          <v-btn
            color="green darken-1"
            text
            @click="()=>{
              checkDialog = false
            }"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import authenticationService from '/fejlesztes/bulkedit/src/services/authenticationService';
import incidentUpdateService from '/fejlesztes/bulkedit/src/services/incidentUpdateService';
import bodyGeneratorService from '/fejlesztes/bulkedit/src/services/bodyGeneratorService'
import XLSX from 'xlsx';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
      return {
        e6: 1,
        apiUser: '',
        stepOneDone: false,
        apiPassword: '',
        TOPdeskurl: '',
        stepTwoDone: false,
        xlsInput: null,
        interval: {},
        value: 0,
        completeText: "Update Completed",
        completeIcon: "mdi-check-all",
        enabled: false,
        items: [],
        excelObject: [],
        snackbar: false,
        text: '',
        timeout: 2000,
        btnLoading: false,
        incidents: [],
        checkedChanges: [],
        checkList: [],
        dialog: false,
        checkDialog: false,
        selected: null,
        feedback: 0,
        possibilities: [
          {"check": false, "name":"caller"},
          {"check": false, "name":"branch"}, 
          {"check": false, "name":"short description"}, 
          {"check": false, "name":"category"}, 
          {"check": false, "name":"subcategory"}, 
          {"check": false, "name":"object"}, 
          {"check": false, "name":"operator"}, 
          {"check": false, "name":"operator group"}, 
          {"check": false, "name":"processing status"}, 
          {"check": false, "name":"supplier"}
          ],
        rules: [
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        URLrules: [
          value => !!value || 'Required.',
          value => (value && value.includes("https://")) || 'Valid URL',
        ],
        PWrules: [
          value => !!value || 'Required.',
          value => (value && value.length == 29) || 'valid Application Password',
        ],
        ExcelRules: [
          value => !!value || 'Required.',
          value => (value && value.name.includes('.xlsx')) || 'valid XLSx file',
        ],
        ColumnRule: [
          value => !!value || 'Required.'
        ]
      }
    },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    var xlsxScript = document.createElement('script');  
    xlsxScript.setAttribute('src','https://oss.sheetjs.com/sheetjs/xlsx.full.min.js');
    document.head.appendChild(xlsxScript);
  },

  methods: {
    validate: async function(){
      this.text = ""
      let resp = await authenticationService.validateApi(this.TOPdeskurl, this.apiUser, this.apiPassword)
      if (resp == true){
        this.e6 = 2
      } else {
        this.snackbar = true
        this.text = "Authentication failed"
      }
    },
    resetForm: function(){
      this.e6 = 1
      this.xlsInput = null
      this.value = 0
      this.feedback = 0
      this.items = []
      this.selected = null
      this.checkList = []
      this.possibilities = [
          {"check": false, "name":"caller", "value": ""},
          {"check": false, "name":"branch", "value": ""}, 
          {"check": false, "name":"short description", "value": ""}, 
          {"check": false, "name":"category", "value": ""}, 
          {"check": false, "name":"subcategory", "value": ""}, 
          {"check": false, "name":"object", "value": ""}, 
          {"check": false, "name":"operator", "value": ""}, 
          {"check": false, "name":"operator group", "value": ""}, 
          {"check": false, "name":"processing status", "value": ""}, 
          {"check": false, "name":"supplier", "value": ""}
          ]
    },

    bulkEdit: async function(){
      this.btnLoading = true
      this.checkedChanges = this.possibilities.filter(possibility => possibility.check == true)
      let idRequiredChanges = [];
      let namesArray = []
      this.checkedChanges.forEach(checkedChange => namesArray.push(checkedChange.name))
      namesArray.forEach(elem=>{
        let index = this.checkedChanges.map(function(e) { return e.name; }).indexOf(elem);
        if (this.checkedChanges[index].check == true){
          idRequiredChanges.push(this.checkedChanges[index])
        }
      })

      let resp = await bodyGeneratorService.prepare(this.TOPdeskurl, this.apiUser, this.apiPassword, idRequiredChanges)
      setTimeout(() => {
        Object.keys(resp).forEach(key => {
          // figure out which index
          let index = this.checkedChanges.map(function(e) { return e.name; }).indexOf(key);
          // add value to the indexed checkedChange
          this.checkedChanges[index]['id'] = resp[key]
        })


        this.body = bodyGeneratorService.generateBody(this.checkedChanges)
        this.btnLoading = false
        this.e6 = 4
        this.dialog = true

      }, 2001);
    },
    updateGo: async function(){
      let currIndex = -1;
      this.updateOnce = async()=>{
        ++currIndex
        if(currIndex >= this.incidents.length){
          clearInterval(interval);
        } else {
          let resp = await incidentUpdateService.sendUpdateRequest(
            {'authentication': {
              'TOPdeskURL': this.TOPdeskurl,
              'username': this.apiUser,
              'password': this.apiPassword
              },
              'incident': this.incidents[currIndex],
              'body': this.body
            }
          )

          this.checkList.push({
            'Incident Number': resp.status < 300 ? resp.data.number : resp.config.url.split("/").pop(),
            'Status': resp.status < 300 ? 'Done' : 'Failed',
            'Message': resp.status < 300 ? '' : resp.data[0].message
            })

          this.feedback ++
          this.value = Math.round(this.feedback / this.incidents.length * 100)
        }
      }
      let interval = setInterval(this.updateOnce, 200);
    },

    processExcel: function(){
      let data=[{
                  "name":"jayanth",
                  "data":"scd",
                  "abc":"sdef"
              }]

      XLSX.utils.json_to_sheet(data, 'out.xlsx');
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(this.xlsInput);
      fileReader.onload = async (event)=>{
          let data = event.target.result;
          let workbook = XLSX.read(data,{type:"binary"});
          this.excelObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
          Object.keys(this.excelObject[0]).forEach(element => this.items.push(element))
      }
    }
  },

  computed: {
    checked: function(){
      let filtered = this.possibilities.filter(possibility => possibility.check == true)
      let final = filtered.map(x=>{return x.name})
      return final
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
