<template>
  <div class="btn" @click="backButton">
    <span class="material-icons">arrow_back</span> 
    Back
  </div>
  <div class="container">
    <div class="left-content">
      <div class="card">
        <div class="card-header">
          <span class="material-icons">view_list</span> Details
        </div>
        <div class="card-content">
          <div class="data-group">
            <p class="label">Program Name:</p>
            <p class="value">{{ programData.program.name }}</p>
          </div>
          <div class="data-group">
            <p class="label">Agency:</p>
            <p class="value">{{ programData.program.agency.name }}</p>
          </div>
          <div class="data-group">
            <p class="label">Program Type:</p>
            <p class="value">{{ programData.program.program_type.name }}</p>
          </div>
          <div class="data-group">
            <p class="label">Description:</p>
            <p class="value">{{ programData.program.description }}</p>
          </div>
          <div class="data-group">
            <p class="label">Start Date:</p>
            <p class="value">{{ programData.program.start_date }}</p>
          </div>
          <div class="data-group">
            <p class="label">End Date:</p>
            <p class="value">{{ programData.program.end_date }}</p>
          </div>
          <div class="data-group">
            <p class="label">Minimum Semester:</p>
            <p class="value">{{ programData.program.min_semester }}</p>
          </div>
          <div class="data-group">
            <p class="label">SKS Total:</p>
            <p class="value">{{ programData.program.sks }}</p>
          </div>
          <div class="checkBoxContainer">
            <label class="checkbox certiFied" disabled>
              <div v-if="programData.program.is_certified">
                <span class="material-icons">verified</span> Certified
              </div>
              <div v-else>
                <span class="material-icons">unpublished</span> Not Certified
              </div>
            </label>
            <label class="checkbox remoTe" disabled>
              <div v-if="programData.program.is_remote">
                <span class="material-icons">wifi_tethering</span> Remote
              </div>
              <div v-else>
                <span class="material-icons">wifi_tethering_off</span> On the Spot
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="card">
        <div class="card-header">
          <span class="material-icons">info</span> Information
        </div>
        <div class="card-content">
          <div class="data-group">
            <p class="label">Status:</p>
            <p class="value">{{ programData.status }}</p>
          </div>
          <div class="data-group">
            <p class="label">Supervisor:</p>
            <p class="value">{{ programData.supervisor }}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="material-icons">description</span> Files
        </div>
        <div class="card-content">
          <div class="data-group">
            <p class="label">Accepted File:</p>
            <p class="value">{{ programData.accepted_mark_file }}</p>
          </div>
          <div class="data-group">
            <p class="label">Completed File:</p>
            <p class="value">{{ programData.completed_mark_file }}</p>
          </div>
          <div class="data-group">
            <p class="label">Transcript File:</p>
            <p class="value">{{ programData.transcript_file }}</p>
          </div>
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
    
  },
  methods: {
    backButton(){
      this.$emit('statusChange', 'List')
    }
  }
  // mounted(){
  //   // console.log(this.programData)
  // }
}
</script>

<style scoped>
.btn{
  text-align: left;
  margin-top: 12px;
  margin-bottom: -16px;
  margin-left: 20px;
}

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

.data-group{
  margin: 8px 4px 20px 4px;
}

.data-group .label{
  font-weight: 600;
  font-size: 0.72em;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  color: #555;
}

.data-group .value{
  font-size: 1em;
  margin: 0;
}

.checkBoxContainer{
  margin-top: -4px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
}

.checkbox{
  font-size: 0.7em;
  color: #42b983;
  border: 1px solid #42b983;
  padding: 4px 8px;
  border-radius: 12px;
  margin-right: 8px;
  text-align: center;
}

.checkbox .material-icons{
  vertical-align: middle;
  margin: 0;
}

@media screen and (max-width: 600px) {
  .container{
    padding: 16px 8px;
    display: block;
  }
}
</style>