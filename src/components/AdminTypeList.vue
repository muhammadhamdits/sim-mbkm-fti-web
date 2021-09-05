<template>
  <div class="container">
    <h3>Program Types List</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th class="text-left">Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="types.length">
        <tr v-for="(type, index) in types" :key="type.id">
          <td>{{ 1+index }}</td>
          <td class="text-left">{{ type.name }}</td>
          <td>
            <button class="btn btn-warning" @click="showTypeForm('Edit', type)">
              <span class="material-icons">edit</span>
            </button>
            <button class="btn btn-danger" @click="confirmDelete(type)">
              <span class="material-icons">delete</span>
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3">No data available....</td>
        </tr>
      </tbody>
    </table>
  </div>

  <button class="float" @click="showTypeForm('Add')">
    <p><span class="material-icons">add</span></p>
  </button>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getCookie } from "../utils/function";
import { watch } from '@vue/runtime-core';

export default {
  name: 'AdminTypeList',
  emits: ['statusChange'],
  props: ['initTypes'],
  setup(){
    const types = ref('')
    const url = 'http://192.168.100.38:5000/type'
    const jwt = getCookie('jwt')

    const getTypes = async() => {
      let result = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await result.json()

      types.value = jsonData
    }

    return { types, getTypes }
  },
  methods: {
    showTypeForm(status, type=''){
      this.$emit('statusChange', status, type)
    },
    confirmDelete(type){
      this.$emit('statusChange', 'List', {
          status: true,
          type: 'confirmAlert',
          data: type
      })
    }
  },
  created(){
    if(this.initTypes.length) this.types = this.initTypes
    else this.getTypes()
  },
  watch: {
    initTypes(value, oldValue){
      this.getTypes()
    }
  }
}
</script>

<style scoped>
h3{
  margin-top: 0;
  color: #42b983;
}

table{
  width: 100%;
  padding-bottom: 12vh;
}

tr{
  padding: 8px;
}

th, td{
  border-top: 1px solid #ccc;
  padding: 6px;
  color: #464;
}

.container{
  margin: 0 auto;
  max-width: 1024px;
  padding: 16px;
}

.btn{
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 12px;
  margin: 0 2px;
}

.btn-warning{
  border: 1px solid orange;
  background-color: white;
  color: orange;
}

.btn-warning:hover{
  color: white;
  background-color: orange;
}

.btn-danger{
  border: 1px solid firebrick;
  background-color: white;
  color: firebrick;
}

.btn-danger:hover{
  background-color: firebrick;
  color: #fff;
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

.float:hover{
  background-color: #3ba374;
}

.float p{
	margin-top: 9px;
  font-size: 38px;
}

.material-icons{
  font-size: 1.2em;
}

.text-left{
  text-align: left;
}

@media screen and (max-width: 600px) {
  .float{
    bottom: 72px;
  }
}
</style>