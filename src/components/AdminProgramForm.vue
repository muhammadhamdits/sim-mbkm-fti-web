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
      <input type="checkbox" v-model="is_certified"><label class="checkbox-label">Is Certified?</label>
      <br>
      <input type="checkbox" v-model="is_remote"><label class="checkbox-label">Is Remote?</label>
      <br>
      <button class="float-left" @click="backWard">
        <span class="material-icons">arrow_back</span> Back
      </button>
      <button class="float-right" @click="submitData">
        <span class="material-icons">save</span> Submit
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getCookie } from '../utils/function'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'AdminProgramForm',
  emits: ['statusChange'],
  props: ['program', 'formData'],
  setup(){
    const name = ref('')
    const agency_id = ref('')
    const program_type_id = ref('')
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
      start_date, 
      end_date, 
      description, 
      min_semester, 
      sks,
      is_certified,
      is_remote,
      agencies, 
      types,
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
          start_date: this.start_date, 
          end_date: this.end_date, 
          description: this.description, 
          min_semester: this.min_semester, 
          sks: this.sks,
          is_certified: this.is_certified,
          is_remote: this.is_remote
        })
      })
      let jsonData = await result.json()

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
    }
  },
  mounted(){
    if(this.formData.status === 'Edit'){
      this.name = this.formData.program.name, 
      this.agency_id = this.formData.program.agency_id, 
      this.program_type_id = this.formData.program.program_type_id, 
      this.start_date = this.formData.program.start_date, 
      this.end_date = this.formData.program.end_date, 
      this.description = this.formData.program.description, 
      this.min_semester = this.formData.program.min_semester, 
      this.sks = this.formData.program.sks,
      this.is_certified = this.formData.program.is_certified,
      this.is_remote = this.formData.program.is_remote
    }
  }
}
</script>

<style scoped>
form{
  max-width: 420px;
  margin: 32px auto;
  background: white;
  text-align: left;
  padding: 40px;
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

input, button, select{
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  border-radius: 8px;
  color: #555;
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
  margin: 40px 0 0;
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
</style>