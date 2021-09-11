<template>
  <div class="container">
    <div class="row">
      <div class="col-25" v-if="listStatus">
        <div class="card" v-for="submission in submissions" :key="submission.student_id + submission.program_id" @click="updateStatus('Detail', submission)" :ref="`cardDom${submission.student_id}+${submission.program_id}`">
          <div class="card-body">
            <h4>{{ submission.program.name }}</h4>
            <h5>by {{ submission.student.name }}</h5>
            <h6>{{ submission.program.program_type.name }} | {{ submission.program.agency.name }}</h6>
          </div>
        </div>
      </div>
      <div class="col-75" v-if="detailStatus">
        <div class="row">
          <div class="col-3">
            <div class="card">
              <div class="card-header">
                Program Detail
              </div>
              <div class="card-body">
                <div class="data-group">
                  <p class="label">Program Name:</p>
                  <p class="value">{{ submissionDetail.program.name }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Agency:</p>
                  <p class="value">{{ submissionDetail.program.agency.name }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Program Type:</p>
                  <p class="value">{{ submissionDetail.program.program_type.name }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Description:</p>
                  <p class="value">{{ submissionDetail.program.description }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Start Date:</p>
                  <p class="value">{{ submissionDetail.program.start_date }}</p>
                </div>
                <div class="data-group">
                  <p class="label">End Date:</p>
                  <p class="value">{{ submissionDetail.program.end_date }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Minimum Semester:</p>
                  <p class="value">{{ submissionDetail.program.min_semester }}</p>
                </div>
                <div class="data-group">
                  <p class="label">SKS Total:</p>
                  <p class="value">{{ submissionDetail.program.sks }}</p>
                </div>
                <div class="checkBoxContainer">
                  <label class="checkbox certiFied" disabled>
                    <div v-if="submissionDetail.program.is_certified">
                      <span class="material-icons">verified</span> Certified
                    </div>
                    <div v-else>
                      <span class="material-icons">unpublished</span> Not Certified
                    </div>
                  </label>
                  <label class="checkbox remoTe" disabled>
                    <div v-if="submissionDetail.program.is_remote">
                      <span class="material-icons">wifi_tethering</span> Remote
                    </div>
                    <div v-else>
                      <span class="material-icons">wifi_tethering_off</span> On the Spot
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header">
                    Information
                    <span class="material-icons" @click="editInfo" v-if="!editStatus">edit</span>
                  </div>
                  <div class="card-body" v-if="editStatus">
                    <h6>Status:</h6>
                    <select v-model="submissionDetail.status">
                      <option value="0">Proposed</option>
                      <option value="1">Accepted</option>
                      <option value="2">Rejected</option>
                    </select>
                    <h6>Supervisor:</h6>
                    <select v-model="submissionDetail.lecturer_id">
                      <option :value="lecturer.id" v-for="lecturer in lecturers" :key="lecturer.id">{{ lecturer.name }}</option>
                    </select>
                    <div class="button-wrapper">
                      <button @click="closeEditForm"><span class="material-icons">close</span></button>
                      <button @click="submitEditForm"><span class="material-icons">save</span></button>
                    </div>
                  </div>
                  <div class="card-body" v-else>
                    <h6>Status:</h6>
                    <h5>{{ submissionDetail.status_name }}</h5>
                    <h6>Supervisor:</h6>
                    <h5>{{ submissionDetail.supervisor }}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header">
                    Files
                  </div>
                  <div class="card-body">
                    <h6>Accepted File:</h6>
                    <h5>Ini File</h5>
                    <h6>Completed File:</h6>
                    <h5>Ini File</h5>
                    <h6>Transcript File:</h6>
                    <h5>Ini File</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-75" v-else>
        <div class="card">
          Select program on the left menu first....
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import { getCookie } from '../../utils/function'

export default {
  name: 'HeadOfDeptSubmissions',
  setup(){
    const submissions = ref([])
    const lecturers = ref([])
    const submissionDetail = ref({})
    const listStatus = ref(true)
    const detailStatus = ref(false)
    const editStatus = ref(false)

    const getAllSubmissions = async () => {
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/student-program`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        }
      })
      let jsonData = await fetchResult.json()
      submissions.value = jsonData
    }

    const getAllLecturers = async () => {
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/lecturers`, {
        method: 'GET',
        mode: 'cors',
        headers:{
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        }
      })
      let jsonData = await fetchResult.json()
      lecturers.value = jsonData
    }

    onMounted(async () => {
      document.title = 'Submissions - SIM MBKM FTI'
      await getAllSubmissions()
      await getAllLecturers()
    })

    return { submissions, lecturers, submissionDetail, listStatus, detailStatus, editStatus, getAllSubmissions }
  },
  methods: {
    updateStatus(state, data){
      if(state === 'Detail'){
        document.getElementsByClassName('card').forEach(element => {
          element.classList.remove('active')
        })
        this.$refs[`cardDom${data.student_id}+${data.program_id}`].classList.add('active')
        this.detailStatus = true
        this.editStatus = false
        this.submissionDetail = data
      }
    },
    editInfo(){
      this.editStatus = true
    },
    closeEditForm(){
      this.editStatus = false
    },
    async submitEditForm(){
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/student/${this.submissionDetail.student_id}/program/${this.submissionDetail.program_id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        },
        body: JSON.stringify({
          status: this.submissionDetail.status,
          lecturer_id: this.submissionDetail.lecturer_id
        })
      })
      let jsonData = await fetchResult.json()
      await this.getAllSubmissions()
      document.getElementsByClassName('active')[0].click()
      this.closeEditForm()
      // console.log(jsonData)
    }
  }
}
</script>

<style scoped>
h2, h3, h4, h5, h6{
  text-align: left;
  margin: 2px;
}

select{
  background-color: #fff;
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 8px;
  color: #444;
}

.col-2 h5{
 margin-bottom: 8px;
}

.text-left{
  text-align: left;
}

.container{
  max-width: 1024px;
  padding: 8px 16px;
  margin: 0 auto;
}

.row{
  display: flex;
}

.col{
  flex: 1;
}

.col-2{
  flex: 2;
}

.col-3{
  flex: 3;
}

.col-25{
  flex: 25;
}

.col-75{
  flex: 75;
}

.card{
  margin: 4px;
  border: 1px solid #42b983;
  border-radius: 8px;
}

.col-25 .card:hover, .card.active{
  cursor: pointer;
  background-color: #c2f7df;
}

.card-header{
  /* border-radius: 8px; */
  padding: 4px 8px;
  color: #fff;
  background-color: #42b983;
}

.card-header .material-icons{
  /* vertical-align: middle; */
  font-size: 0.9em;
  cursor: pointer;
  float: right;
}

.card-header .material-icons:hover{
  font-size: 1em;
}

.card-body{
  padding: 8px 12px;
}

.data-group{
  margin: 8px 4px 20px 4px;
  text-align: left;
}

.data-group .label{
  font-weight: 600;
  font-size: 0.72em;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  color: #555;
}

.data-group .value{
  font-size: 1em;
  margin: 0;
}

.checkBoxContainer{
  margin-top: -4px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
}

.checkbox{
  font-size: 0.7em;
  color: #42b983;
  border: 1px solid #42b983;
  padding: 4px 8px;
  border-radius: 12px;
  margin-right: 8px;
  text-align: center;
}

.checkbox .material-icons{
  vertical-align: middle;
  margin: 0;
}

.button-wrapper{
  text-align: right;
}

.button-wrapper button{
  outline: none;
  border-radius: 4px;
  padding: 2px 4px;
  background-color: #42b983;
  border: 1px solid #42b983;
  color: #fff;
  cursor: pointer;
  /* float: right; */
  margin: 4px;
}

.button-wrapper button:hover{
  background-color: #fff;
  color: #42b983;
}

.button-wrapper button .material-icons{
  font-size: 1.2em;
}

@media screen and (max-width: 600px) {
  .row{
    display: block;
  }
}
</style>