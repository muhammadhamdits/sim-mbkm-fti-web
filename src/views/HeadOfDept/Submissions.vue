<template>
  <div class="container">
    <div class="row">
      <div class="col-25" v-if="listStatus">
        <div class="card" v-for="submission in orderedSubmissions" :key="submission.student_id + submission.program_id" @click="updateStatus('Detail', submission)" :ref="`cardDom${submission.student_id}+${submission.program_id}`">
          <div class="card-body">
            <h4>{{ submission.student.name }}</h4>
            <h5>{{ submission.program.name }}</h5>
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
                    <h5>Status:</h5>
                    <select v-model="submissionDetail.status">
                      <option value="0">Proposed</option>
                      <option value="1">Accepted</option>
                      <option value="2">Rejected</option>
                    </select>
                    <h5>Supervisor:</h5>
                    <select v-model="submissionDetail.lecturer_id">
                      <option :value="lecturer.id" v-for="lecturer in lecturers" :key="lecturer.id">{{ lecturer.name }}</option>
                    </select>
                    <div class="button-wrapper">
                      <button @click="closeEditForm"><span class="material-icons">close</span></button>
                      <button @click="submitEditForm"><span class="material-icons">save</span></button>
                    </div>
                  </div>
                  <div class="card-body text-left" v-else>
                    <h5>Status:</h5>
                    <a>{{ submissionDetail.status_name }}</a>
                    <h5>Supervisor:</h5>
                    <a>{{ submissionDetail.supervisor }}</a>
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
                  <div class="card-body text-left">
                    <h5>Accepted File:</h5>
                    <a :href="apiUri+'/student/'+submissionDetail.student_id+'/program/'+submissionDetail.program_id+'/accepted_file/download'" :download="submissionDetail.accepted_file" v-if="submissionDetail.accepted_file" class="download-link">
                      <span class="material-icons file-download">save_alt</span>
                      Download File
                    </a>
                    <a v-else>Not yet uploaded..</a>
                    <h5>Completed File:</h5>
                    <a :href="apiUri+'/student/'+submissionDetail.student_id+'/program/'+submissionDetail.program_id+'/completed_file/download'" :download="submissionDetail.completed_file" v-if="submissionDetail.completed_file" class="download-link">
                      <span class="material-icons file-download">save_alt</span>
                      Download File
                    </a>
                    <a v-else>Not yet uploaded..</a>
                    <h5>Transcript File:</h5>
                    <a :href="apiUri+'/student/'+submissionDetail.student_id+'/program/'+submissionDetail.program_id+'/transcript_file/download'" :download="submissionDetail.transcript_file" v-if="submissionDetail.transcript_file" class="download-link">
                      <span class="material-icons file-download">save_alt</span>
                      Download File
                    </a>
                    <a v-else>Not yet uploaded..</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header">
                    Courses
                    <span class="material-icons" @click="toggleConfirmCourse">edit</span>
                  </div>
                  <div class="card-body" v-if="refresh">
                    <div class="list text-left" v-for="course in orderedCourses" :key="course.course_id">
                      <h5 style="display: inline-block">{{ course.course.name }}</h5>
                      <span v-if="confirmCourseState" style="float: right; margin-top: 7px">
                        <label class="switch">
                          <input type="checkbox" v-model="sdc[course.course_id]">
                          <span class="slider round"></span>
                        </label>
                      </span>
                      <span v-else>
                        <span class="material-icons badge-success" v-if="course.is_accepted">check</span>
                        <span class="material-icons badge-danger" v-else>remove</span>
                      </span>
                    </div>
                    <div class="button-wrapper" v-if="confirmCourseState" style="margin-top: 8px">
                      <button @click="submitConfimrCourse"><span class="material-icons">save</span></button>
                    </div>
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
import _ from 'lodash'

export default {
  name: 'HeadOfDeptSubmissions',
  computed: {
    orderedSubmissions: function() {
      return _.orderBy(this.submissions, ['student.name', 'program.name'], ['asc', 'asc'])
    },
    orderedCourses: function(){
      return _.orderBy(this.submissionDetail.courses, ['course.name'], 'asc')
    }
  },
  setup(){
    const submissions = ref([])
    const lecturers = ref([])
    const submissionDetail = ref({})
    const listStatus = ref(true)
    const detailStatus = ref(false)
    const editStatus = ref(false)
    const apiUri = ref('')
    const confirmCourseState = ref(false)
    const sdc = ref([])
    const refresh = ref(true)

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
      apiUri.value = process.env.VUE_APP_API_URI
    })

    return { submissions, lecturers, submissionDetail, listStatus, detailStatus, editStatus, apiUri, confirmCourseState, sdc, refresh, getAllSubmissions }
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
        this.sdc = []
        data.courses.forEach(element => {
          this.sdc[element.course_id] = element.is_accepted
        })
        // console.log(this.sdc)
        // console.log(data)
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
    },
    toggleConfirmCourse(){
      this.confirmCourseState = !this.confirmCourseState
    },
    async submitConfimrCourse(){
      let bodyData = []
      this.sdc.forEach((v, i) => {
        bodyData.push({ course_id: i, is_accepted: v })
      })
      // console.log(bodyData)
      let fetchResult = await fetch(`${this.apiUri}/student/${this.submissionDetail.student_id}/program/${this.submissionDetail.program_id}/course`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        },
        body: JSON.stringify(bodyData)
      })
      let jsonData = await fetchResult.json()
      // console.log(jsonData)
      await this.getAllSubmissions()
      this.submissionDetail =  this.submissions.find(obj => { 
        return obj.student_id === this.submissionDetail.student_id && obj.program_id === this.submissionDetail.program_id
      })
      // console.log(this.submissions)
      this.confirmCourseState = !this.confirmCourseState
      this.refresh = false
      this.refresh = true
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
 margin-top: 8px;
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
  border-radius: 8px;
  padding: 2px 4px;
  background-color: #42b983;
  border: 1px solid #42b983;
  color: #fff;
  cursor: pointer;
  /* float: right; */
  margin: 4px;
}

.button-wrapper button:hover{
  background-color: #2c815b;
  border: 1px solid #2c815b;
  color: #fff;
}

.button-wrapper button .material-icons{
  font-size: 1.2em;
}

.download-link{
  color: #2c815b;
  text-decoration: none;
  text-align: left;
}

.download-link:hover{
  color: #42b983;
}

.file-download{
  text-align: left;
  vertical-align: middle;
}

.badge-danger, .badge-success{
  vertical-align: middle;
  float: right;
  /* cursor: pointer; */
}

.badge-danger{
  color: firebrick;
}

.badge-success{
  color: #42b983;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 32px;
  /* height: 34px; */
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 12px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #42b983;
}

input:focus + .slider {
  box-shadow: 0 0 1px #42b983;
}

input:checked + .slider:before {
  -webkit-transform: translateX(12px);
  -ms-transform: translateX(12px);
  transform: translateX(12px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

@media screen and (max-width: 600px) {
  .row{
    display: block;
  }
}
</style>