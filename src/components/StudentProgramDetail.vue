<template>
  <div class="btn" @click="backButton">
    <span class="material-icons">arrow_back</span> 
    Back
  </div>
  <div class="container">
    <div class="left-content">
      <div class="card">
        <div class="card-header">
          <span class="material-icons">view_list</span> Details
        </div>
        <div class="card-content">
          <div class="data-group">
            <p class="label">Program Name:</p>
            <p class="value">{{ programData.program.name }}</p>
          </div>
          <div class="data-group">
            <p class="label">Agency:</p>
            <p class="value">{{ programData.program.agency.name }}</p>
          </div>
          <div class="data-group">
            <p class="label">Program Type:</p>
            <p class="value">{{ programData.program.program_type.name }}</p>
          </div>
          <div class="data-group">
            <p class="label">Description:</p>
            <p class="value">{{ programData.program.description }}</p>
          </div>
          <div class="data-group">
            <p class="label">Start Date:</p>
            <p class="value">{{ programData.program.start_date }}</p>
          </div>
          <div class="data-group">
            <p class="label">End Date:</p>
            <p class="value">{{ programData.program.end_date }}</p>
          </div>
          <div class="data-group">
            <p class="label">Minimum Semester:</p>
            <p class="value">{{ programData.program.min_semester }}</p>
          </div>
          <div class="data-group">
            <p class="label">SKS Total:</p>
            <p class="value">{{ programData.program.sks }}</p>
          </div>
          <div class="checkBoxContainer">
            <label class="checkbox certiFied" disabled>
              <div v-if="programData.program.is_certified">
                <span class="material-icons">verified</span> Certified
              </div>
              <div v-else>
                <span class="material-icons">unpublished</span> Not Certified
              </div>
            </label>
            <label class="checkbox remoTe" disabled>
              <div v-if="programData.program.is_remote">
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
    <div class="right-content">
      <div class="card">
        <div class="card-header">
          <span class="material-icons">info</span> Information
        </div>
        <div class="card-content">
          <div class="data-group">
            <p class="label">Status:</p>
            <p class="value">{{ programData.status_name }}</p>
          </div>
          <div class="data-group">
            <p class="label">Supervisor:</p>
            <p class="value">{{ programData.supervisor }}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="material-icons">description</span> Files
        </div>
        <div class="card-content">
          <div class="data-group">
            <p class="label">Accepted File:</p>
            <p class="value">{{ programData.accepted_mark_file }}</p>
          </div>
          <div class="data-group">
            <p class="label">Completed File:</p>
            <p class="value">{{ programData.completed_mark_file }}</p>
          </div>
          <div class="data-group">
            <p class="label">Transcript File:</p>
            <p class="value">{{ programData.transcript_file }}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="material-icons">school</span> Courses
          <span class="material-icons btn-right" @click="showAddCourse" id="buttonAddCourses">add</span>
        </div>
        <div class="card-content" v-show="coursesAddState">
          <select v-model="newCourses" multiple ref="selectcourses">
            <option v-for="course in restCourses" :value="course.id" :key="course.id">{{ course.name }} ({{ course.sks }} SKS)</option>
          </select>
          <button @click="addCourses">Submit</button>
        </div>
        <div class="card-content" v-show="!coursesAddState">
          <div class="list-wrapper" v-for="course in programData.courses" :key="course.course_id">
            <div class="list-left">
              <div class="item">{{ course.course.name }}</div>
              <div class="badge">{{ course.course.sks }} SKS</div>
            </div>
            <div class="list-right">
              <div class="badge" v-if="course.is_accepted">Accepted</div>
              <div class="badge" v-else>Not Accepted</div>
              <span class="material-icons" @click="removeCourse(course.course_id)" v-if="!course.is_accepted">close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { getCookie } from '../utils/function'

export default {
  name: 'StudentProgramDetail',
  emits: ['statusChange'],
  props: ['programData'],
  setup(){
    const coursesAddState = ref(false)
    const newCourses = ref([])
    const restCourses = ref([])

    return { coursesAddState, newCourses, restCourses }
  },
  methods: {
    backButton(){
      this.$emit('statusChange', 'List')
    },
    showAddCourse(e){
      e.target.style.display = 'none'
      this.coursesAddState = true
      let selectCoursesDom = this.getSelectCoursesDom()
      let size = this.restCourses.length
      selectCoursesDom.setAttribute('size', size+2)
    },
    getSelectCoursesDom(){
      return this.$refs.selectcourses
    },
    async addCourses(){
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/student/${this.$root.userData.id}/program/${this.programData.program_id}/course`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt'),
        },
        body: JSON.stringify(this.newCourses)
      })
      let jsonData = await fetchResult.json()

      document.getElementById("buttonAddCourses").style.display = 'inline-block'
      this.coursesAddState = false
      this.$emit('statusChange', 'Add', this.programData, jsonData)
    },
    filterRestCourses(){
      let pc = this.programData.program.courses
      let spc = this.programData.courses

      this.restCourses = pc.filter(ar => !spc.find(rm => (rm.course_id === ar.id) ))
    },
    async removeCourse(course_id){
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/student/${this.$root.userData.id}/program/${this.programData.program_id}/course/${course_id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        }
      })
      let jsonData = await fetchResult.json()
      // console.log(jsonData)
      this.$emit('statusChange', 'Add', this.programData, jsonData)
    }
  },
  async mounted(){
    this.filterRestCourses()
    // console.log(this.programData)
  }
}
</script>

<style scoped>
select[multiple] {
  width: 100%;
  height: auto;
  overflow-y: auto;
  border: none;
}

select[multiple] option{
  padding: 8px;
  margin: 4px 0;
  border-radius: 4px;
  font-size: 1.2em;
}

select[multiple] option:checked{
  background: linear-gradient(0deg, #42b983 0%, #42b983 100%);
}

select[multiple] option:first-child{
  margin: 0 0 4px 0;
}

select[multiple] option:last-child{
  margin: 4px 0 0 0;
}

select[multiple]:focus{
  outline: none;
}

.btn{
  text-align: left;
  margin-top: 12px;
  margin-bottom: -16px;
  margin-left: 20px;
}

.btn-right{
  cursor: pointer;
  float: right;
  padding: 2px;
  border-radius: 8px;
}

.btn-right:hover{
  background-color: #3ba374;
}

.container{
  display: flex;
  margin: 0 auto;
  padding: 16px;
  max-width: 1024px;
  /* background-color: blue; */
}

.left-content, .right-content{
  margin: 8px;
}

.left-content{
  flex: 3;
  /* background-color: red; */
}

.right-content{
  flex: 2;
  /* background-color: chartreuse; */
}

.card{
  margin: 8px auto;
  text-align: left;
  border: 1px solid #42b983;
  border-radius: 8px;
}

.card-header{
  padding: 6px 12px;
  background-color: #42b983;
  color: #fff;
  font-weight: 600;
}

.card-content{
  padding: 12px;
}

.card-content button{
  outline: none;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: #42b983;
  color: #fff;
  border: 1px solid #42b983;
  cursor: pointer;
}

.card-content button:hover{
  background-color: #fff;
  color: #42b983;
}

.material-icons{
  vertical-align: sub;
}

.data-group{
  margin: 8px 4px 20px 4px;
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

.list-wrapper{
  display: flex;
  /* margin: 4px 0; */
  padding: 8px 0;
  border-bottom: 1px solid #42b983;
}

.list-wrapper:last-child{
  border: none;
}

.list-left, .list-right{
  flex: 1;
}

.list-left .item{
  font-size: 1em;
  display: inline-block;
}

.list-left .badge{
  font-size: 0.8em;
}

.list-right{
  text-align: right;
  /* float: right; */
}

.badge{
  margin: 0 4px;
  font-size: 0.85em;
  padding: 2px 4px;
  display: inline-block;
  background-color: #42b983;
  color: #fff;
  font-weight: 600;
  border: 1px solid #42b983;
  border-radius: 8px;
}

.list-right .material-icons{
  background-color: firebrick;
  color: #fff;
  border: 1px solid firebrick;
  padding: 2px 4px;
  border-radius: 8px;
  vertical-align: middle;
  font-size: 1em;
  font-weight: 900;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .container{
    padding: 16px 8px;
    display: block;
  }
}
</style>