<template>
  <div class="container">
    <Modal @closeModal="closeModal" v-if="modalStatus">
      <h4>Are you sure you want to delete this agency data?</h4>
      <h2>{{ agencyName }}</h2>
      <button class="btn btn-warning btn-md" @click="closeModal">No</button>
      <button class="btn btn-danger btn-md" @click="deleteAgency">Yes</button>
    </Modal>
    <h3>Agencies list</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Agency</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="agencies.length">
        <tr v-for="(agency, index) in agencies" :key="agency.id">
          <td>{{ 1+index }}</td>
          <td class="text-left">{{ agency.name }}</td>
          <td class="text-right">
            <button class="btn btn-warning" @click="showEditAgencyForm(agency)">Edit</button>
            <button class="btn btn-danger" @click="confirmDelete(agency)">Delete</button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3"> No data available.... </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class="float" @click="showAddAgencyForm">
    <p>+</p>
  </button>
</template>

<script>
import { ref } from '@vue/reactivity';
import { getCookie } from "../utils/function";
import Modal from '@/components/Modal.vue'

export default {
  name: 'AdminAgencyList',
  components: { Modal },
  emits: ['statusChange', 'closeModal'],
  data(){
    return { 
      modalStatus: false,
      agencyName: '',
      agencyId: ''
    }
  },
  setup(){
    const agencies = ref('')

    const getAgencies = () => {
      const url = 'http://192.168.100.38:5000/agency'
      const jwt = getCookie('jwt')

      fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      }).then(res => {
        res.json().then(jsonData => {
          agencies.value = jsonData
        })
      })
    }

    getAgencies()

    return { agencies, getAgencies }
  },
  methods: {
    showAddAgencyForm(){
      this.$emit('statusChange', 'Add', '')
    },
    showEditAgencyForm(data){
      this.$emit('statusChange', 'Edit', data)
    },
    closeModal(){
      this.modalStatus = false
    },
    confirmDelete(agency){
      this.modalStatus = true
      this.agencyId = agency.id
      this.agencyName = agency.name
    },
    async deleteAgency(){
      const url = `http://192.168.100.38:5000/agency/${this.agencyId}`
      const jwt = getCookie('jwt')

      const res = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      const jsonData = await res.json()

      if(jsonData.success){
        this.closeModal()
        this.getAgencies()
      }else{
        
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

.text-left{
  text-align: left;
}

.text-right{
  text-align: right;
}

table{
  width: 100%;
  border-top: 1px solid #ccc;
}

tr{
  text-align: center;
  padding: 8px;
}

th, td{
  padding: 6px;
  color: #464;
}

td{
  border-top: 1px solid #ccc;
}

h2{
  color: #42b983;
}

h3{
  margin-top: 0;
  color: #42b983;
}

.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background:#42b983;
	color:#FFF;
  border: none;
  padding: 0;
  cursor: pointer;
	border-radius:50px;
	text-align:center;
  text-decoration: none;
	box-shadow: 2px 2px 3px #999;
}

.float p{
	margin-top: 9px;
  font-size: 38px;
}

.float:hover{
  color: #42b983;
  background-color: #fff;
  border: 1px solid #42b983;
}

.btn{
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 12px;
  margin: 0 2px;
}

.btn-md{
  padding: 12px 16px;
  font-size: 1em;
  font-weight: bold;
  margin: 8px 8px 0 8px;
}

.btn-warning{
  color: white;
  border: 1px solid orange;
  background-color: orange;
}

.btn-warning:hover{
  background-color: white;
  color: orange;
}

.btn-danger{
  border: 1px solid firebrick;
  background-color: firebrick;
  color: #fff;
}

.btn-danger:hover{
  background-color: white;
  color: firebrick;
}

@media screen and (max-width: 600px) {
  .float{
    bottom: 12vh;
  }
  table{
    padding-bottom: 12vh;
  }
}
</style>