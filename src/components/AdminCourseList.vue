<template>
  <div class="container">
    <h3>Course List</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th class="text-left">Name</th>
          <th>SKS</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="initCourses.length">
        <tr v-for="(course, index) in initCourses" :key="course.id">
          <td>{{ 1+index }}</td>
          <td class="text-left">{{ course.name }}</td>
          <td>{{ course.sks }}</td>
          <td>
            <button class="btn btn-warning" @click="showCourseForm('Edit', course)">
              <span class="material-icons">edit</span>
            </button>
            <button class="btn btn-danger" @click="confirmDelete(course)">
              <span class="material-icons">delete</span>
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4">No data available...</td>
        </tr>
      </tbody>
    </table>
  </div>

  <button class="float" @click="showCourseForm('Add')">
    <p><span class="material-icons">add</span></p>
  </button>
</template>

<script>
export default {
  name: 'AdminCourseList',
  emits: ['statusChange'],
  props: ['initCourses'],
  setup(){

  },
  methods: {
    showCourseForm(status, course){
      this.$emit('statusChange', status, course)
    },
    confirmDelete(course){
      this.$emit('statusChange', 'List', {
          status: true,
          type: 'confirmAlert',
          course
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