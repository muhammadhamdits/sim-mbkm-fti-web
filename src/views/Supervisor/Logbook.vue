<template>
  <div class="container">
    <div class="left-content">
      <div class="card" v-if="showLog">
        <div class="card-header">
          {{ studentProgramData.program.name }}
          <span class="material-icons" @click="showLogbooks(false)">expand_less</span>
        </div>
        <div class="card-body">
          <div class="card-content" v-for="log in studentProgramData.logbooks" :key="log.id" @click="showComments(log)" :ref="`log-${log.id}`">
            <p class="p-content">{{ log.log }}</p>
            <p class="p-sub-content">{{ log.date }}</p>
          </div>
        </div>
      </div>
      <div class="program-list" v-else>
        <div class="card" v-for="studentProgram in studentPrograms" :key="studentProgram.student_id+'-'+studentProgram.program_id">
          <div class="card-header">
            {{ studentProgram.program.name }}
            <span class="material-icons" @click="showLogbooks(true, studentProgram)">expand_more</span>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="card">
        <div class="card-header">
          Comments
        </div>
        <div class="card-body" v-if="logData">
          <div v-for="comment in logData.comments" :key="comment.id">
            <div class="comment-container student" v-if="comment.is_lecturer">
              <!-- <p class="name">Supervisor</p> -->
              <p class="comment">{{ comment.comment }}</p>
            </div>
            <div class="comment-container supervisor" v-else>
              <!-- <p class="name">Student</p> -->
              <p class="comment">{{ comment.comment }}</p>
            </div>
          </div>
          <div class="input-container">
            <input type="text" v-model="newComment" @keyup.enter="sendComment">
            <button @click="sendComment"><span class="material-icons">send</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal @closeModal="closeModal" v-if="showModal">
    <div class="alert" v-if="alertStatus">
      {{ alertMessage }}
    </div>
  </Modal>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import Modal from '@/components/Modal.vue'
import { getCookie } from '../../utils/function'

export default {
  name: 'SupervisorLogbook',
  components: {
    Modal
  },
  setup(){
    const showLog = ref(false)
    const showModal = ref(false)
    const studentPrograms = ref([])
    const studentProgramData = ref({})
    const log = ref('')
    const logData = ref(false)
    const alertStatus = ref(false)
    const alertMessage = ref('')
    const newComment = ref('')

    const showAddLogbook = () => {
      showModal.value = true
    }

    const closeModal = () => {
      alertStatus.value = false
      showModal.value = false
    }

    const showLogbooks = (state, data = {}) => {
      showLog.value = state
      studentProgramData.value = data
      logData.value = false
    }

    onMounted(() => {
      document.title = 'Home - SIM MBKM FTI'
    })

    return { showLog, showModal, log, studentPrograms, studentProgramData, logData, alertStatus, alertMessage, newComment, showAddLogbook, closeModal, showLogbooks }
  },
  methods: {
    async getAllStudentPrograms(){
      // console.log(this.$root.userData.id)
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/supervisor-student-program/${this.$root.userData.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        }
      })
      let jsonData = await fetchResult.json()
      this.studentPrograms = jsonData
    },
    showComments(data){
      document.getElementsByClassName('card-content').forEach(element => {
        element.classList.remove('active')
      })
      this.$refs[`log-${data.id}`].classList.add('active')
      this.logData = data
    },
    async sendComment(){
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/comment/${this.logData.id}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        },
        body: JSON.stringify({ comment: this.newComment, is_lecturer: true })
      })
      let jsonData = await fetchResult.json()
      this.newComment = ''
      await this.getAllStudentPrograms()
      this.studentProgram = this.studentPrograms.find(sp => sp.student_id === this.logData.student_id && sp.program_id === this.logData.program_id)
      let logId = this.logData.id
      this.logData = false
      this.logData = this.studentProgram.logbooks.find(l => l.id === logId)
      // console.log(jsonData)
    }
  },
  async mounted(){
    await this.getAllStudentPrograms()
  }
}
</script>

<style scoped>
p{
  margin: 0;
}

.modal-container input{
  margin: 8px 0;
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  border-radius: 8px;
  color: #555;
}

.modal-container button{
  margin: 0 4px;
  outline: none;
  color: #fff;
  background-color: #42b983;
  border: 1px solid #42b983;
  border-radius: 8px;
  padding: 4px 6px;
  cursor: pointer;
}

.modal-container button:hover{
  background-color: #3ba374;
}

.input-container{
  margin-top: 8px;
  display: flex;
}

.input-container input, .input-container input:focus{
  border-radius: 8px;
  border: 1px solid #42b983;
  border-bottom: 0;
  border-left: 0;
  flex: 85;
  outline: none;
}

.input-container button{
  background: none;
	color: inherit;
	border: none;
	padding: 0 8px;
	font: inherit;
	cursor: pointer;
	outline: none;
}

.input-container button:hover{
  color: #42b983;
}

p.name{
  font-size: 0.9em;
  font-weight: 600;
}

p.comment{
  border-radius: 12px;
  display: inline-block;
  font-size: 0.85em;
  padding: 4px 8px;
  border: 1px solid #42b983;
  /* background-color: #dcf5e9; */
}

.p-sub-content{
  font-size: 0.8em;
}

.container{
  padding: 8px 16px;
  max-width: 1024px;
  max-height: 80vh;
  display: flex;
  text-align: left;
  margin: auto;
}

.left-content{
  flex: 2;
}

.right-content{
  flex: 3;
}

.card{
  /* max-height: 100%; */
  margin: 2px 4px;
  border: 1px solid #42b983;
  border-radius: 8px;
}

.active{
  cursor: pointer;
  background-color: #c2f7df;
}

.card-header{
  color: #fff;
  font-weight: 600;
  background-color: #42b983;
  padding: 6px 8px;
}

.card-body{
  max-height: 80vh;
  overflow-y: scroll;
}

.card-content{
  cursor: pointer;
  border-bottom: 1px solid #42b983;
  padding: 8px 8px;
}

.card-content:hover{
  background-color: #c2f7df;
}

.comment-container{
  padding: 8px;
}

.comment-container.supervisor{
  text-align: left;
}

.comment-container.student{
  text-align: right;
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

.float .material-icons{
  font-size: 3.2em;
  vertical-align: middle;
}

.card .card-header .material-icons{
  /* padding: 2px 2px 0 2px; */
  border-radius: 8px;
  float: right;
  cursor: pointer;
}

.card .card-header .material-icons:hover{
  background-color: #3ba374;
}

::-webkit-scrollbar {
  width: 0;  /* Remove scrollbar space */
  background: transparent;  /* Optional: just make scrollbar invisible */
}

@media screen and (max-width: 600px) {
  .float{
    bottom: 72px;
  }
}
</style>