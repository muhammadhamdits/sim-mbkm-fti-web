<template>
  <Modal @closeModal="closeModal" v-if="showModal">
    <h3>{{ modalMessage }}</h3>
  </Modal>
  <div class="container">
    <div class="row">
      <div class="col-25">
        <div class="card" v-for="studentProgram in studentPrograms" :key="studentProgram.student_id+'-'+studentProgram.program_id" @click="updateStatus('Detail', studentProgram)" :ref="`cardDom${studentProgram.student_id}+${studentProgram.program_id}`">
          <div class="card-body">
            <h4>{{ studentProgram.student.name }}</h4>
            <h5>{{ studentProgram.program.name }}</h5>
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
                  <p class="label">Status:</p>
                  <p class="value">{{ studentProgramDetail.status_name }}</p>
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
                    <span class="material-icons" style="font-size: 1em; float: right; cursor: pointer" @click="changeGradingStatus">settings</span>
                  </div>
                  <div class="card-body">
                    <div class="list-wrapper" v-for="course in studentProgramDetail.courses" :key="course.course_id">
                      <div class="list-left">
                        <div class="item">{{ course.course.name }}</div>
                        <div style="margin: 4px 0">
                          <div class="badge">{{ course.course.sks }} SKS</div>
                          <div class="badge" v-if="course.is_accepted">Accepted</div>
                          <div class="badge" v-else>Not Accepted</div>
                        </div>
                      </div>
                      <div class="list-right">
                        <span class="material-icons badge-danger" @click="confirmCourse(false, course.course_id)"  v-if="course.is_accepted && studentProgramDetail.status !== 4">close</span>
                        <span class="material-icons badge-success" @click="confirmCourse(true, course.course_id)" v-else-if="studentProgramDetail.status !== 4">check</span>
                        <input type="text" style="width: 24px; height: 24px" v-if="gradingStatus" v-model="grade[course.id]">
                      </div>
                    </div>
                    <span class="badge" style="margin-top: 16px; cursor: pointer" @click="submitGrade" v-if="gradingStatus">Submit</span>
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
import Modal from '@/components/Modal.vue'

export default {
  name: 'SupervisorHome',
  components: {
    Modal
  },
  setup(){
    const studentPrograms = ref([])
    const studentProgramDetail = ref({})
    const detailStatus = ref(false)
    const showModal = ref(false)
    const modalMessage = ref('')
    const gradingStatus = ref(false)
    const grade = ref({})

    const closeModal = () => {
      showModal.value = false
    }

    const changeGradingStatus = () => {
      gradingStatus.value = !gradingStatus.value
    }

    onMounted(() => {
      document.title = 'Home - SIM MBKM FTI'
    })

    return { studentPrograms, studentProgramDetail, detailStatus, showModal, modalMessage, gradingStatus, grade, closeModal, changeGradingStatus }
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
    },
    async confirmCourse(is_accepted, course_id){
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/student/${this.studentProgramDetail.student_id}/program/${this.studentProgramDetail.program_id}/course/${course_id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        },
        body: JSON.stringify({ is_accepted })
      })
      let jsonData = await fetchResult.json()
      // console.log(jsonData)
      this.modalMessage = jsonData.success
      this.showModal = true
      this.studentPrograms = await this.getAllPrograms()
      let tempStudentProgramDetail = this.studentPrograms.find(tempStudentProgram => tempStudentProgram.program_id === this.studentProgramDetail.program_id && tempStudentProgram.student_id === this.studentProgramDetail.student_id)
      this.studentProgramDetail = tempStudentProgramDetail
    },
    async submitGrade(){
      console.log(this.grade)
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

.list-wrapper{
  display: flex;
  /* margin: 4px 0; */
  padding: 8px 0;
  border-bottom: 1px solid #42b983;
}

.list-wrapper:last-child{
  border: none;
}

.list-right{
  flex: 1;
}

.list-left{
  flex: 4;
  text-align: left;
}

.list-left .item{
  font-size: 1em;
  /* text-align: left; */
  /* align-items: left; */
  display: inline-block;
}

.list-left .badge{
  font-size: 0.8em;
}

.list-right{
  text-align: right;
  /* float: right; */
}

.badge{
  margin: 0 4px;
  font-size: 0.85em;
  padding: 2px 4px;
  display: inline-block;
  background-color: #42b983;
  color: #fff;
  font-weight: 600;
  border: 1px solid #42b983;
  border-radius: 8px;
}

.badge-success{
  background-color: #42b983;
  color: #fff;
  border: 1px solid #42b983;
  padding: 2px 4px;
  border-radius: 8px;
  vertical-align: middle;
  font-size: 1em;
  font-weight: 900;
  cursor: pointer;
}

.badge-danger{
  background-color: firebrick;
  color: #fff;
  border: 1px solid firebrick;
  padding: 2px 4px;
  border-radius: 8px;
  vertical-align: middle;
  font-size: 1em;
  font-weight: 900;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .row{
    display: block;
  }
}
</style>