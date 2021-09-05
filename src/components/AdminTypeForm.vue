<template>
  <div class="container">
    <form>
      <h3>{{ formData.dom.formTitle }}</h3>
      <label>Name</label>
      <input type="text" v-model="name">
      <p>{{ error.name }}</p>
      <button class="float-left" @click="backWard">
        <span class="material-icons">arrow_back</span> Back
      </button>
      <button class="float-right" @click="submitData" v-if="formData.dom.status === 'Add'">
        <span class="material-icons">save</span> {{ formData.dom.buttonTitle }}
      </button>
      <button class="float-right" @click="submitData" v-else>
        <span class="material-icons">save</span> {{ formData.dom.buttonTitle }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { getCookie } from "../utils/function";
import { onMounted } from '@vue/runtime-core';

export default {
  name: 'AdminTypeForm',
  emits: ['statusChange'],
  props: ['formData'],
  setup(){
    const name = ref('')
    const error = ref({})
    const fetch = ref({ url: `${process.env.VUE_APP_API_URI}/type`, method: 'POST' })
    const jwt = getCookie('jwt')
    
    return { name, fetch, jwt, error }
  },
  methods: {
    backWard(e){
      e.preventDefault()
      this.$emit('statusChange', 'List')
    },
    async submitData(e){
      e.preventDefault()
      if(this.formData.dom.status === 'Edit'){
        this.fetch.url = `${this.fetch.url}/${this.formData.typeData.id}`
        this.fetch.method = 'PUT'
      }
      let result = await fetch(this.fetch.url, {
        method: this.fetch.method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: this.jwt
        },
        body: JSON.stringify({ name: this.name })
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
            this.error.name = error.message
          });
        }else{
          this.error.name = jsonData.error
        }
      }
    }
  },
  mounted(){
    this.name = this.formData.typeData.name
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

input, button{
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