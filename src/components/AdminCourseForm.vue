<template>
  <div class="container">
    <form>
      <h3>{{ formData.formTitle }}</h3>
      <label>Code</label>
      <input type="text" v-model="code">
      <p>{{ error.code }}</p>
      <label>Name</label>
      <input type="text" v-model="name">
      <p>{{ error.name }}</p>
      <label>SKS</label>
      <input type="number" v-model="sks">
      <p>{{ error.sks }}</p>
      <label>Semsester</label>
      <input type="number" v-model="semester">
      <p>{{ error.semester }}</p>
      <label>Type</label>
      <select v-model="type">
        <option value="0">Required</option>
        <option value="1">Optional</option>
      </select>
      <p>{{ error.type }}</p>
      <button class="float-left" @click="backWard">
        <span class="material-icons">arrow_back</span> Back
      </button>
      <button class="float-right" @click="submitData" v-if="formData.status === 'Add'">
        <span class="material-icons">save</span> {{ formData.buttonTitle }}
      </button>
      <button class="float-right" @click="submitData" v-else>
        <span class="material-icons">save</span> {{ formData.buttonTitle }}
      </button>
    </form>
  </div>
</template>

<script>
import { getCookie } from "@/utils/function"
import { ref } from '@vue/reactivity'

export default {
  name: 'AdminCourseForm',
  emits: ['statusChange'],
  props: ['formData'],
  setup(){
    const code = ref('')
    const name = ref('')
    const sks = ref('')
    const type = ref('')
    const semester = ref('')
    const error = ref({})
    const jwt = getCookie('jwt')
    const fetch = ref({ url: `${process.env.VUE_APP_API_URI}/course`, method: 'POST' })

    return { code, name, sks, type, semester, error, jwt, fetch }
  },
  methods: {
    backWard(e){
      e.preventDefault()
      this.$emit('statusChange', 'List')
    },
    async submitData(e){
      e.preventDefault()
      this.fetch.url = `${process.env.VUE_APP_API_URI}/course`
      if(this.formData.status === 'Edit'){
        this.fetch.url = `${this.fetch.url}/${this.formData.course.id}`
        this.fetch.method = 'PUT'
      }
      let result = await fetch(this.fetch.url, {
        method: this.fetch.method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: this.jwt
        },
        body: JSON.stringify({ 
          code: this.code, 
          name: this.name, 
          sks: this.sks,
          semester: this.semester,
          type: this.type 
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
      }else{
        this.error = {}
        if(jsonData.errors){
          jsonData.errors.forEach(error => {
            if(error.key === 'name') this.error.name = error.message
            else if(error.key === 'sks') this.error.sks = error.message
            else if(error.key === 'code') this.error.code = error.message
            else if(error.key === 'type') this.error.type = error.message
            else if(error.key === 'semester') this.error.semester = error.message
          })
        }else{
          this.error.type = jsonData.error
        }
      }
    }
  },
  mounted(){
    if(this.formData.status === 'Edit'){
      this.code = this.formData.course.code
      this.name = this.formData.course.name
      this.sks = this.formData.course.sks
      this.type = this.formData.course.type
      this.semester = this.formData.course.semester
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

button{
  display: inline-block;
  width: 46%;
  margin: 40px 0;
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
</style>