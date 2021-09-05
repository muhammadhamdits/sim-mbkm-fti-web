<template>
  <div class="container">
    <h3>Program List</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Agency</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="initPrograms.length">
        <tr v-for="(program, index) in initPrograms" :key="program.id">
          <td>{{ 1+index }}</td>
          <td @click="showProgramForm('Show', program)" class="item">{{ program.name }}</td>
          <td>{{ program.agency_id }}</td>
          <td>{{ program.program_type_id }}</td>
          <td>
            <button class="btn btn-warning" @click="showProgramForm('Edit', program)">
              <span class="material-icons">edit</span>
            </button>
            <button class="btn btn-danger" @click="confirmDelete(program)">
              <span class="material-icons">delete</span>
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5">No data available...</td>
        </tr>
      </tbody>
    </table>
  </div>

  <button class="float" @click="showProgramForm('Add')">
    <p><span class="material-icons">add</span></p>
  </button>
</template>

<script>
export default {
  name: 'AdminProgramList',
  emits: ['statusChange'],
  props: ['initPrograms'],
  setup(){

  },
  methods: {
    showProgramForm(status, program){
      if(status === 'Add'){
        this.$emit('statusChange', status)
      }else if(status === 'Edit' || 'Show'){
        this.$emit('statusChange', status, program)
      }
    },
    confirmDelete(program){
      this.$emit('statusChange', 'List', {
          status: true,
          type: 'confirmAlert',
          program
      })
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

.item {
  color: #3ba374;
}

.item:hover{
  cursor: pointer;
  font-weight: bold;
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