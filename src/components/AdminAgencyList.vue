<template>
  <div class="container">
    <Modal @closeModal="closeModal" v-if="modalStatus">
      <h4>Are you sure you want to delete this agency data?</h4>
      <h2>{{ agencyName }}</h2>
      <button class="btn btn-warning btn-md" @click="closeModal">
        <span class="material-icons">arrow_back</span> No, go back!
      </button>
      <button class="btn btn-danger btn-md" @click="deleteAgency">
        <span class="material-icons">delete</span> Yes, delete it!
      </button>
    </Modal>

    <Modal @closeModal="closeModal" v-if="alerts.status">
      <h2><span class="material-icons">check</span></h2>
      <h4>{{ alerts.message }}</h4>
    </Modal>
    <h3>Agencies list</h3>
    <table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Agency</th>
          <th class="text-left address">Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="agencies.length">
        <tr v-for="(agency, index) in agencies" :key="agency.id">
          <td class="text-left">{{ 1+index }}</td>
          <td class="text-left">
            <a class="item" @click="showDetailAgency(agency)">{{ agency.name }}</a>
          </td>
          <td class="text-left address">{{ agency.address }}</td>
          <td>
            <button class="btn btn-warning" @click="showEditAgencyForm(agency)">
              <span class="material-icons">edit</span>
            </button>
            <button class="btn btn-danger" @click="confirmDelete(agency)">
              <span class="material-icons">delete</span>
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4" class="no-data"> No data available.... </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class="float" @click="showAddAgencyForm">
    <p><span class="material-icons">add</span></p>
  </button>
</template>

<script>
import { ref } from '@vue/reactivity';
import { getCookie } from "../utils/function";
import Modal from '@/components/Modal.vue'

export default {
  name: 'AdminAgencyList',
  components: { Modal },
  props: ['alerts'],
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
      const url = `${process.env.VUE_APP_API_URI}/agency`
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
    showDetailAgency(data){
      this.$emit('statusChange', 'Show', data)
    },
    closeModal(){
      this.modalStatus = false
      this.alerts.status = false
    },
    confirmDelete(agency){
      this.modalStatus = true
      this.agencyId = agency.id
      this.agencyName = agency.name
    },
    async deleteAgency(){
      const url = `${process.env.VUE_APP_API_URI}/agency/${this.agencyId}`
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
        this.$emit('statusChange', 'List', '', { status: true, message: jsonData.success })
        this.getAgencies()
      }else{
        
      }
    }
  },
  mounted(){
    // console.log(this.alert)
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
  padding-bottom: 12vh;
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
  background-color: #3ba374;
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

.btn-warning:hover{
  color: white;
  background-color: orange;
}

.btn-warning{
  border: 1px solid orange;
  background-color: white;
  color: orange;
}

.btn-danger:hover{
  background-color: firebrick;
  color: #fff;
}

.btn-danger{
  border: 1px solid firebrick;
  background-color: white;
  color: firebrick;
}

.item{
  color: #42b983;
  cursor: pointer;
}

.item:hover{
  font-weight: bolder;
}

.material-icons{
  font-size: 1.2em;
}

h2 .material-icons{
  font-size: 2em;
}

.btn-md .material-icons{
  font-size: 1.6em;
  vertical-align: middle;
  margin: -8px 0 -4px -8px;
}

@media screen and (max-width: 600px) {
  .float{
    bottom: 72px;
  }
  .address{
    display: none;
  }
  .no-data{
    column-span: 3;
  }

  /* table{
    padding-bottom: 12vh;
  } */
}
</style>