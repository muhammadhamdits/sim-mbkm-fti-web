<template>
  <div class="container">
    <form>
      <h3 v-if="agencyData === ''">Add New Agency</h3>
      <h3 v-else>Update {{ this.agencyData.name }} Data</h3>
      <label>Name:</label>
      <input type="text" v-model="name">
      <p>{{ error.name }}</p>
      <label>Address:</label>
      <input type="text" v-model="address">
      <p>{{ error.address }}</p>
      <button class="float-left" @click="backWard">Back</button>
      <button class="float-right" @click="submitData" v-if="agencyData === ''">Submit</button>
      <button class="float-right" @click="updateData" v-else>Update</button>
    </form>
  </div>
</template>

<script>
import { getCookie } from "../utils/function";

export default {
  name: 'AdminAgencyAdd',
  props: ['agencyData'],
  emits: ['statusChange'],
  data(){
    return {
      id: '',
      name: '', 
      address: '',
      error: {
        name: '',
        address: ''
      }
    }
  },
  beforeMount(){
    if(this.agencyData !== ''){
      this.id = this.agencyData.id
      this.name = this.agencyData.name
      this.address = this.agencyData.address
    }
  },
  methods: {
    backWard(e){
      e.preventDefault()
      this.$emit('statusChange', 'List')
    },
    async submitData(e){
      e.preventDefault()
      const url = 'http://192.168.100.38:5000/agency'
      const jwt = getCookie('jwt')
      let name = this.name
      let address = this.address
      const data = { name, address }

      const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        },
        body: JSON.stringify(data)
      })
      const jsonData = await res.json()

      if(jsonData.success){
        this.$emit('statusChange', 'List', '', { status: true, message: jsonData.success})
      }else{
        jsonData.errors.forEach(error => {
          if(error.key === "name") this.error.name = error.message
          else if(error.key === "address") this.error.address = error.message
        });
      }
    },
    async updateData(e){
      e.preventDefault()
      const url = `http://192.168.100.38:5000/agency/${this.id}`
      const jwt = getCookie('jwt')
      let name = this.name
      let address = this.address
      const data = { name, address }

      const res = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        },
        body: JSON.stringify(data)
      })
      const jsonData = await res.json()

      if(jsonData.success){
        this.$emit('statusChange', 'List', '', { status: true, message: jsonData.success})
      }else{
        jsonData.errors.forEach(error => {
          if(error.key === "name") this.error.name = error.message
          else if(error.key === "address") this.error.address = error.message
        });
      }
    }
  }
}
</script>

<style scoped>
.container{
  margin: 0 auto;
  max-width: 1024px;
  padding: 16px;
}

h3{
  color: #42b983;
  text-align: center;
}

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

.float-right{
  float: right;
}

p{
  font-size: 0.8em;
  font-weight: bolder;
  color: red
}
</style>