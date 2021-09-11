<template>
  <div class="container">
    <div class="row">
      <div class="col-25">
        <div class="card" v-for="studentProgram in studentPrograms" :key="studentProgram.student_id+'-'+studentProgram.program_id" @click="updateStatus('Detail', studentProgram)" :ref="`cardDom${studentProgram.student_id}+${studentProgram.program_id}`">
          <div class="card-body">
            <h4>{{ studentProgram.program.name }}</h4>
            <h5>By {{ studentProgram.student.name }}</h5>
            <h6>{{ studentProgram.program.program_type.name }} | {{ studentProgram.program.agency.name }}</h6>
          </div>
        </div>
      </div>
      <div class="col-75">
        <div class="row" v-if="detailStatus">
          <div class="col-3">
            <div class="card">
              <div class="card-header">
                Program Detail
              </div>
              <div class="card-body">
                <div class="data-group">
                  <p class="label">Program Name:</p>
                  <p class="value">{{ studentProgramDetail.program.name }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Agency:</p>
                  <p class="value">{{ studentProgramDetail.program.agency.name }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Program Type:</p>
                  <p class="value">{{ studentProgramDetail.program.program_type.name }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Description:</p>
                  <p class="value">{{ studentProgramDetail.program.description }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Start Date:</p>
                  <p class="value">{{ studentProgramDetail.program.start_date }}</p>
                </div>
                <div class="data-group">
                  <p class="label">End Date:</p>
                  <p class="value">{{ studentProgramDetail.program.end_date }}</p>
                </div>
                <div class="data-group">
                  <p class="label">Minimum Semester:</p>
                  <p class="value">{{ studentProgramDetail.program.min_semester }}</p>
                </div>
                <div class="data-group">
                  <p class="label">SKS Total:</p>
                  <p class="value">{{ studentProgramDetail.program.sks }}</p>
                </div>
                <div class="checkBoxContainer">
                  <label class="checkbox certiFied" disabled>
                    <div v-if="studentProgramDetail.program.is_certified">
                      <span class="material-icons">verified</span> Certified
                    </div>
                    <div v-else>
                      <span class="material-icons">unpublished</span> Not Certified
                    </div>
                  </label>
                  <label class="checkbox remoTe" disabled>
                    <div v-if="studentProgramDetail.program.is_remote">
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
          <div class="col-2">
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header">
                    Courses
                  </div>
                  <div class="card-body">
                    <h6>Status:</h6>
                    <h5>{{ studentProgramDetail.status_name }}</h5>
                    <h6>Supervisor:</h6>
                    <h5>{{ studentProgramDetail.supervisor }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card" v-else>Select program first</div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import { getCookie } from '../../utils/function'
export default {
  name: 'SupervisorHome',
  setup(){
    const studentPrograms = ref([])
    const studentProgramDetail = ref({})
    const detailStatus = ref(false)

    onMounted(() => {
      document.title = 'Home - SIM MBKM FTI'
    })

    return { studentPrograms, studentProgramDetail, detailStatus }
  },
  methods:{
    async getAllPrograms(){
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/supervisor-student-program/${this.$root.userData.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        }
      })
      let jsonData = await fetchResult.json()
      // console.log(jsonData)
      return jsonData
    },
    updateStatus(state, data){
      if(state === 'Detail'){
        document.getElementsByClassName('card').forEach(element => {
          element.classList.remove('active')
        })
        this.$refs[`cardDom${data.student_id}+${data.program_id}`].classList.add('active')
        this.detailStatus = true
        // this.editStatus = false
        this.studentProgramDetail = data
      }
    }
  },
  async mounted(){
    this.studentPrograms = await this.getAllPrograms()
    // console.log(this.$root.userData)
  }
}
</script>

<style scoped>
h2, h3, h4, h5, h6{
  text-align: left;
  margin: 2px;
}

.text-left{
  text-align: left;
}

.container{
  max-width: 1024px;
  padding: 8px 16px;
  margin: 0 auto;
}

.row{
  display: flex;
}

.col{
  flex: 1;
}

.col-2{
  flex: 2;
}

.col-3{
  flex: 3;
}

.col-25{
  flex: 25;
}

.col-75{
  flex: 75;
}

.card{
  margin: 4px;
  border: 1px solid #42b983;
  border-radius: 8px;
}

.col-25 .card:hover, .card.active{
  cursor: pointer;
  background-color: #c2f7df;
}

.card-header{
  /* border-radius: 8px; */
  padding: 4px 8px;
  color: #fff;
  background-color: #42b983;
}

.card-body{
  padding: 8px 12px;
}

.data-group{
  margin: 8px 4px 20px 4px;
  text-align: left;
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
  .row{
    display: block;
  }
}
</style>