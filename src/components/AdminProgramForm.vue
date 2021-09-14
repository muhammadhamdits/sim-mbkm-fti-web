<template>
  <div class="container">
    <form>
      <h3>{{ formData.formTitle }}</h3>
      <label>name</label>
      <input type="text" v-model="name">
      <p>{{ error.name }}</p>
      <label>Agency</label>
      <select v-model="agency_id">
        <option :value="agency.id" v-for="agency in agencies" :key="agency.id">{{ agency.name }}</option>
      </select>
      <p>{{ error.agency_id }}</p>
      <label>Program Type</label>
      <select v-model="program_type_id">
        <option :value="type.id" v-for="type in types" :key="type.id">{{ type.name }}</option>
      </select>
      <p>{{ error.program_type_id }}</p>
      <label>Open Date</label>
      <input type="date" v-model="open_date">
      <p>{{ error.open_date }}</p>
      <label>Close Date</label>
      <input type="date" v-model="close_date">
      <p>{{ error.close_date }}</p>
      <label>Start Date</label>
      <input type="date" v-model="start_date">
      <p>{{ error.start_date }}</p>
      <label>End Date</label>
      <input type="date" v-model="end_date">
      <p>{{ error.end_date }}</p>
      <label>Description</label>
      <input type="text" v-model="description">
      <p>{{ error.description }}</p>
      <label>Minimum Semester</label>
      <input type="number" v-model="min_semester">
      <p>{{ error.min_semester }}</p>
      <label>Total SKS</label>
      <input type="number" v-model="sks">
      <p>{{ error.sks }}</p>
      <label>Is Certified?</label>
      <div style="display: block; width: 100%" @click="toggleCertified">
        <span class="switch">
          <input type="checkbox" v-model="is_certified">
          <span class="slider round"></span>
        </span>
      </div>
      <label>Is Remote?</label>
      <div style="display: block; width: 100%" @click="toggleRemote">
        <span class="switch">
          <input type="checkbox" v-model="is_remote">
          <span class="slider round"></span>
        </span>
      </div>
      <label>Courses</label>
      <select multiple class="multiple-select" v-model="courses">
        <option v-for="course in this.formData.courses" :value="course.id" :key="course.id">
          {{ course.name }}
        </option>
      </select>
      <!-- <span class="material-icons" v-if="is_certified">verified</span> 
      <span class="material-icons" v-else>unpublished</span>  -->
      <!-- <div class="checkBoxContainer"> -->
        <!-- <label class="checkbox certiFied" @click="toggleCertified"> -->
          <!-- Is Certified? -->
        <!-- </label> -->
        <!-- <label class="checkbox remoTe" @click="toggleRemote"> -->
          <!-- <span class="material-icons" v-if="is_remote">wifi_tethering</span>  -->
          <!-- <span class="material-icons" v-else>wifi_tethering_off</span>  -->
          <!-- Is Remote? -->
        <!-- </label> -->
      <!-- </div> -->
      <button class="float-left" @click="backWard">
        <span class="material-icons">arrow_back</span> Back
      </button>
      <button class="float-right" @click="showEditForm" v-if="formData.status === 'Show'">
        <span class="material-icons">edit</span> Edit
      </button>
      <button class="float-right" @click="submitData" v-else>
        <span class="material-icons">save</span> Submit
      </button>
    </form>
  </div>
</template>

<script>
import { readonly, ref } from '@vue/reactivity'
import { getCookie, toggleFormElements, addClass, removeClass } from '../utils/function'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'AdminProgramForm',
  emits: ['statusChange'],
  props: ['program', 'formData'],
  setup(){
    const name = ref('')
    const agency_id = ref('')
    const program_type_id = ref('')
    const open_date = ref('')
    const close_date = ref('')
    const start_date = ref('')
    const end_date = ref('')
    const description = ref('')
    const min_semester = ref('')
    const sks = ref('')
    const is_certified = ref(false)
    const is_remote = ref(false)

    const error = ref({})
    const agencies = ref([])
    const types = ref([])
    const courses = ref([])
    const jwt = getCookie('jwt')

    const getAgencies = async () => {
      let res = await fetch(`${process.env.VUE_APP_API_URI}/agency`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await res.json()
      agencies.value = jsonData
    }

    const getTypes = async() => {
      let res = await fetch(`${process.env.VUE_APP_API_URI}/type`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await res.json()
      types.value = jsonData
    }

    onMounted(() => {
      getAgencies()
      getTypes()
    })

    return { 
      name, 
      agency_id, 
      program_type_id, 
      open_date, 
      close_date, 
      start_date, 
      end_date, 
      description, 
      min_semester, 
      sks,
      is_certified,
      is_remote,
      agencies, 
      types,
      courses,
      error,
      jwt
    }
  },
  methods: {
    backWard(e){
      e.preventDefault()
      this.$emit('statusChange', 'List', )
    },
    async submitData(e){
      // console.log(this.courses)
      e.preventDefault()
      let fetchUrl = `${process.env.VUE_APP_API_URI}/program`
      let fetchMethod = 'POST'
      if(this.formData.status === 'Edit'){
        fetchUrl += `/${this.formData.program.id}`
        fetchMethod = 'PUT'
      }

      let result = await fetch(fetchUrl, {
        method: fetchMethod,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: this.jwt
        },
        body: JSON.stringify({
          name: this.name, 
          agency_id: this.agency_id, 
          program_type_id: this.program_type_id, 
          open_date: this.open_date, 
          close_date: this.close_date, 
          start_date: this.start_date, 
          end_date: this.end_date, 
          description: this.description, 
          min_semester: this.min_semester, 
          sks: this.sks,
          is_certified: this.is_certified,
          is_remote: this.is_remote,
          courses: this.courses
        })
      })
      let jsonData = await result.json()
      // console.log(jsonData)
      if(jsonData.success){
        let jsonModal = {
          status: true,
          type: 'flashMessage',
          message: jsonData.success
        }
        this.$emit('statusChange', 'List', jsonModal)
      }else if(jsonData.status){
        console.log(jsonData)
      }else{
        // console.log(jsonData)
        this.error = {}
        if(jsonData.errors){
          jsonData.errors.forEach(error => {
            if(error.key === 'name') this.error.name = error.message
            else if(error.key === 'agency_id') this.error.agency_id = error.message
            else if(error.key === 'program_type_id') this.error.program_type_id = error.message
            else if(error.key === 'open_date') this.error.open_date = error.message
            else if(error.key === 'close_date') this.error.close_date = error.message
            else if(error.key === 'start_date') this.error.start_date = error.message
            else if(error.key === 'end_date') this.error.end_date = error.message
            else if(error.key === 'description') this.error.description = error.message
            else if(error.key === 'min_semester') this.error.min_semester = error.message
            else if(error.key === 'sks') this.error.sks = error.message
            else if(error.key === 'is_certified') this.error.is_certified = error.message
            else if(error.key === 'is_remote') this.error.is_remote = error.message
          })
        }else{
          this.error.sks = jsonData.error
        }
      }
    },
    showEditForm(){
      toggleFormElements(document, false)
      this.$emit('statusChange', 'Edit', this.formData.program)
    },
    toggleCertified(e){
      if(this.formData.status !== 'Show'){
        // if(this.is_certified) removeClass(e.target, "checkBoxActive")
        // else addClass(e.target, "checkBoxActive")
        this.is_certified = !this.is_certified
      }
    },
    toggleRemote(e){
      if(this.formData.status !== 'Show'){
        // if(this.is_remote) removeClass(e.target, "checkBoxActive")
        // else addClass(e.target, "checkBoxActive")
        this.is_remote = !this.is_remote
      }
    },
    async getCourses(){
      let res = await fetch(`${process.env.VUE_APP_API_URI}/program/${this.formData.program.id}/course`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          jwt: this.jwt
        }
      })
      let jsonData = await res.json()
      let coursesId = []
      jsonData.forEach(value => {
        if(!value.is_deleted) coursesId.push(value.course_id)
      })
      this.courses = coursesId
    }
  },
  mounted(){
    if(this.formData.status === 'Edit' || this.formData.status === 'Show'){
      this.getCourses()
      this.name = this.formData.program.name, 
      this.agency_id = this.formData.program.agency_id, 
      this.program_type_id = this.formData.program.program_type_id, 
      this.open_date = this.formData.program.open_date, 
      this.close_date = this.formData.program.close_date, 
      this.start_date = this.formData.program.start_date, 
      this.end_date = this.formData.program.end_date, 
      this.description = this.formData.program.description, 
      this.min_semester = this.formData.program.min_semester, 
      this.sks = this.formData.program.sks,
      this.is_certified = this.formData.program.is_certified,
      this.is_remote = this.formData.program.is_remote
    }
    if(this.formData.status === 'Show') toggleFormElements(document, true)
    // if(this.is_certified) addClass(document.getElementsByClassName("certiFied")[0], "checkBoxActive")
    // if(this.is_remote) addClass(document.getElementsByClassName("remoTe")[0], "checkBoxActive")
  }
}
</script>

<style scoped>
form{
  max-width: 640px;
  margin: 32px auto;
  background: white;
  text-align: left;
  padding: 40px 24px;
  border-radius: 10px;
  border: 1px solid #42b983;
}

label{
  color: #444;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input, button, select, input:disabled, select:disabled{
  background-color: #fff;
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  border-radius: 8px;
  color: #444;
}

input[type=checkbox] {
  display: inline-block;
  width: fit-content;
  vertical-align: middle;
  margin-right: 12px;
}

button{
  display: inline-block;
  width: 46%;
  margin: 20px 0 0;
  border: 1px solid #42b983;
  background-color: #42b983;
  color: #fff;
  font-size: 0.8em;
  font-weight: bolder;
  text-transform: uppercase;
  cursor: pointer;
}

button:hover{
  background-color: white;
  border: 1px solid #42b983;
  color: #42b983;
}

h3{
  color: #42b983;
  text-align: center;
}

p{
  font-size: 0.8em;
  font-weight: bolder;
  color: red
}

.container{
  margin: 0 auto;
  max-width: 1024px;
  padding: 16px;
}

.multiple-select option{
  float: left;
  /* display: inline-block; */
  padding: 2px 8px;
  background-color: #fff;
  border: 1px solid #42b983;
  margin: 2px 2px 4px 2px;
  color: #42b983;
  border-radius: 16px;
  font-weight: bold;
  cursor: pointer;
}

.multiple-select option:hover{
  background-color: #42b983;
  color: #fff;
}

.multiple-select option:checked, .multiple-select option[selected] {
  background: linear-gradient(0deg, #42b983 0%, #42b983 100%);
}

.checkBoxContainer{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox{
  font-size: 0.75em;
  cursor: pointer;
  color: #42b983;
  border: 1px solid #42b983;
  padding: 4px 8px;
  border-radius: 12px;
  margin-right: 8px;
  text-align: center;
}

.checkbox:hover, .checkBoxActive{
  color: #fff;
  background-color: #42b983;
}

.checkbox .material-icons{
  margin: 0;
}

.float-right{
  float: right;
}

.material-icons{
  font-size: 1.6em;
  vertical-align: middle;
  margin: -8px 0 -4px -8px;
}

.checkbox-label{
  margin-bottom: 0;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
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
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
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
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>