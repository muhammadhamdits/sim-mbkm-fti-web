<template>
  <div class="container">
    <form>
      <h3 v-if="agencyData === ''">Add New Agency</h3>
      <h3 v-else>Update {{ this.agencyData.name }} Data</h3>
      <label>Name:</label>
      <input type="text" v-model="name">
      <p>{{ error.name }}</p>
      <label>Description:</label>
      <textarea cols="30" rows="10" v-model="description"></textarea>
      <p>{{ error.description }}</p>
      <label>Address:</label>
      <input type="text" v-model="address">
      <p>{{ error.address }}</p>
      <label>Sector:</label>
      <input type="text" v-model="sector">
      <p>{{ error.sector }}</p>
      <label>Website:</label>
      <input type="text" v-model="website">
      <p>{{ error.website }}</p>
      <button class="float-left" @click="backWard">
        <span class="material-icons">arrow_back</span> Back
      </button>
      <button class="float-right" @click="submitData" v-if="agencyData === ''">
        <span class="material-icons">save</span> Submit
      </button>
      <button class="float-right" @click="updateData" v-else>
        <span class="material-icons">save</span> Update
      </button>
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
      description: '',
      sector: '',
      website: '',
      error: {
        name: '',
        address: '',
        description: '',
        sector: '',
        website: ''
      }
    }
  },
  beforeMount(){
    if(this.agencyData !== ''){
      this.id = this.agencyData.id
      this.name = this.agencyData.name
      this.address = this.agencyData.address
      this.description = this.agencyData.description
      this.sector = this.agencyData.sector
      this.website = this.agencyData.website
    }
  },
  methods: {
    backWard(e){
      e.preventDefault()
      this.$emit('statusChange', 'List')
    },
    async submitData(e){
      e.preventDefault()
      const url = `${process.env.VUE_APP_API_URI}/agency`
      const jwt = getCookie('jwt')
      let name = this.name
      let address = this.address
      let description = this.description
      let sector = this.sector
      let website = this.website
      const data = { name, address, description, sector, website }

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
      const url = `${process.env.VUE_APP_API_URI}/agency/${this.id}`
      const jwt = getCookie('jwt')
      let name = this.name
      let address = this.address
      let description = this.description
      let sector = this.sector
      let website = this.website
      const data = { name, address, description, sector, website }

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
        this.error = {}
        if(jsonData.errors){
          jsonData.errors.forEach(error => {
            if(error.key === "name") this.error.name = error.message
            else if(error.key === "address") this.error.address = error.message
          });
        }else{
          this.error.address = jsonData.error
        }
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

input, button, textarea{
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

.material-icons{
  font-size: 1.6em;
  vertical-align: middle;
  margin: -8px 0 -4px -8px;
}
</style>