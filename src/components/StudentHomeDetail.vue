<template>
  <div class="btn" @click="backButton" v-if="showBackButton">
    <span class="material-icons">arrow_back</span> 
    Back
  </div>
  <h3>{{ program.name }}</h3>
  <label>Agency:</label>
  <p>{{ program.agency_id }}</p>
  <label>Type:</label>
  <p>{{ program.program_type_id }}</p>
  <label>Start Date:</label>
  <p>{{ program.start_date }}</p>
  <label>End Date:</label>
  <p>{{ program.end_date }}</p>
  <label>Description:</label>
  <p>{{ program.description }}</p>
  <label>Minimum Semester:</label>
  <p>{{ program.min_semester }}</p>
  <label>SKS Total:</label>
  <p>{{ program.sks }}</p>
  <label>Can converted to courses:</label>
  <div class="badge-container">
    <div class="badge" v-for="course in courses" :key="course.id">{{ course.course_id }}</div>
  </div>
  <br>
  <button class="register-button" @click="registerConfirm" v-if="notRegistered">
    <span class="material-icons">person_add_alt_1</span>
    REGISTER
  </button>
  <button class="register-button register-button-disabled" v-else>
    <span class="material-icons">person_add_alt_1</span>
    ALREADY REGISTERED
  </button>
</template>

<script>
import { ref } from '@vue/reactivity'
import { checkAuth, getCookie } from '../utils/function'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'StudentHomeDetail',
  props: ['program'],
  emits: ['statusChange'],
  setup(){
    const showBackButton = ref(false)
    const notRegistered = ref(true)
    const courses = ref([])

    if(document.body.clientWidth <= 600) showBackButton.value = true

    return { showBackButton, courses, notRegistered }
  },
  methods: {
    backButton(){
      this.$emit('statusChange', 'List')
    },
    registerConfirm(){
      this.$emit('statusChange', 'ConfirmRegister', this.program)
    },
    async getAllPrograms(){
      let authData = await checkAuth({ jwt: getCookie('jwt') })
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/student/${authData.id}/program`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        }
      })
      let jsonData = await fetchResult.json()
      // console.log(jsonData)
      return jsonData
    }
  },
  watch: {
    program: {
      handler: async function(newProgram, oldProgram){
        this.notRegistered = true
        let allPrograms = await this.getAllPrograms()
        allPrograms.forEach(detailProgram => {
          if(detailProgram.program_id === newProgram.id) this.notRegistered = false
        })
        let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/program/${newProgram.id}/course`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            jwt: getCookie('jwt')
          }
        })
        let jsonData = await fetchResult.json()
        this.courses = jsonData
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>
*{
  text-align: left;
}

h3{
  margin-bottom: 0;
}

label{
  color: #444;
  display: block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

p{
  color: #2c7956;
}

.btn{
  color: #42b983;
  padding: 8px 0;
  margin-top: 6px;
  display: block;
  text-align: left;
}

.btn .material-icons{
  vertical-align: middle;
}

.badge-container{
  display: block;
  width: 100%;
  height: 28px;
}

.badge{
  float: left;
  display: inline-block;
  padding: 4px 8px;
  margin: 0 4px;
  color: #2c7956;
  border: 1px solid #2c7956;
  border-radius: 16px;
  background-color: #feffef;
}

.register-button{
  margin: 0 auto;
  margin-bottom: 16px !important;
  cursor: pointer;
  outline: none;
  padding: 6px 8px;
  border: 1px solid #42b983;
  border-radius: 8px;
  color: #feffef;
  background-color: #42b983;
  font-size: 1.1em;
}

.register-button:hover{
  color: #42b983;
  background-color: #feffef;
}

.register-button-disabled{
  margin-bottom: 16px !important;
  cursor: default;
  color: #42b983;
  background-color: #feffef;
}

.register-button-disabled:hover{
  color: #42b983;
  background-color: #feffef;
}

.register-button .material-icons{
  vertical-align: sub;
}

@media screen and (max-width: 600) {
  /* .register-button{
    margin-bottom: 100px !important;
  } */
}
</style>