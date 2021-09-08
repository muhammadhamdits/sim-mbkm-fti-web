<template>
  <!-- <div class="btn" @click="backButton">
    <span class="material-icons">arrow_back</span> 
    Back
  </div> -->
  <div class="container">
    <div class="left-content">
      <div class="card">
        <div class="card-header">
          <span class="material-icons">view_list</span> Details
        </div>
        <div class="card-content">
          Nama Program : Programmer
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="card">
        <div class="card-header">
          <span class="material-icons">info</span> Information
        </div>
        <div class="card-content">
          Ini Program Status
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="material-icons">description</span> Files
        </div>
        <div class="card-content">
          Ini Upload Files
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="material-icons">school</span> Courses
        </div>
        <div class="card-content">
          Ini Courses
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentProgramDetail',
  emits: ['statusChange'],
  props: ['programData'],
  setup(){
    
  }
}
</script>

<style scoped>
.container{
  display: flex;
  margin: 0 auto;
  padding: 16px;
  max-width: 1024px;
  /* background-color: blue; */
}

.left-content, .right-content{
  margin: 8px;
}

.left-content{
  flex: 3;
  /* background-color: red; */
}

.right-content{
  flex: 2;
  /* background-color: chartreuse; */
}

.card{
  margin: 8px auto;
  text-align: left;
  border: 1px solid #42b983;
  border-radius: 8px;
}

.card-header{
  padding: 6px 12px;
  background-color: #42b983;
  color: #fff;
  font-weight: 600;
}

.card-content{
  padding: 12px;
}

.material-icons{
  vertical-align: sub;
}

@media screen and (max-width: 600px) {
  .container{
    padding: 16px 8px;
    display: block;
  }
}
</style>