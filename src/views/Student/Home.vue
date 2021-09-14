<template>
  <div class="container">
    <!-- <div class="headContent">
      head
    </div> -->

    <div class="mainContent">
      <div class="leftContent" ref="leftContentDom">
        <StudentHomeList v-if="leftContentStatus" :programs="leftContentData" @statusChange="updateStatus">
        </StudentHomeList>
      </div>
      <div class="rightContent" ref="rightContentDom">
        <StudentHomeDetail v-if="rightContentStatus" :program="rightContentData" @statusChange="updateStatus" :state="state">
        </StudentHomeDetail>
        <p v-else>Select program from left menu...</p>
      </div>
    </div>
  </div>

  <Modal @closeModal="closeModal" v-if="modalData.status">
    <div v-if="modalData.programName">
      <h4>Are you sure you want to register into this program?</h4>
      <h2>{{ modalData.programName }}</h2>
      <button class="btn-danger" @click="closeModal">
        <span class="material-icons">arrow_back</span> No, go back!
      </button>
      <button class="btn-success" @click="registerProgram(modalData.programId)">
        <span class="material-icons">person_add_alt_1</span> Yes, I want it!
      </button>
    </div>
    <div v-else>
      <h2><span class="material-icons">check</span></h2>
      <h4>{{ modalData.message }}</h4>
    </div>
  </Modal>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import StudentHomeList from '@/components/StudentHomeList.vue'
import StudentHomeDetail from '@/components/StudentHomeDetail.vue'
import Modal from '@/components/Modal.vue'
import { checkAuth, getCookie } from '../../utils/function'

export default {
  name: 'Home',
  components: {
    StudentHomeList,
    StudentHomeDetail,
    Modal
  },
  emits: ['statusChange'],
  setup(){
    const leftContentDom = ref(null)
    const rightContentDom = ref(null)
    const leftContentStatus = ref(true)
    const rightContentStatus = ref(false)
    const leftContentData = ref([])
    const rightContentData = ref({})
    const modalData = ref({ status: false })
    const jwt = getCookie('jwt')
    const state = ref(true)

    const loadPrograms = async () => {
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/program`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await fetchResult.json()
      leftContentData.value = jsonData
    }

    const registerProgram = async (program_id) => {
      let authData = await checkAuth({ jwt })
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/student/${authData.id}/program`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        },
        body: JSON.stringify({ program_id })
      })
      let jsonData = await fetchResult.json()
      modalData.value = { status: true, programName: false, message: jsonData.success }
    }
    
    const updateStatus = (status, data={}) => {
      if(status === 'Detail'){
        if(document.body.clientWidth <= 600){
          leftContentDom.value.style.display = "none"
          leftContentStatus.value = false
          rightContentDom.value.style.display = "block"
        }
        rightContentStatus.value = true
        rightContentData.value = data
      }else if(status === 'List'){
        leftContentStatus.value = true
        leftContentDom.value.style.display = "block"
        rightContentStatus.value = false
        rightContentDom.value.style.display = "none"
      }else if(status === 'ConfirmRegister'){
        modalData.value = { status: true, programName: data.name, programId: data.id}
      }
    }

    const closeModal = () => {
      modalData.value = { status: false }
    }

    onMounted(() => {
      loadPrograms()
      document.title = 'Home - SIM MBKM FTI'
    })

    return { 
      leftContentDom, 
      rightContentDom, 
      leftContentStatus, 
      rightContentStatus, 
      leftContentData, 
      rightContentData,
      modalData,
      updateStatus,
      closeModal,
      registerProgram,
      state
    }
  },
  methods: {
    async getUserPrograms(){
      let fetchResult = await fetch(`${process.env.VUE_APP_API_URI}/student/${this.$root.userData.id}/program`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt: getCookie('jwt')
        }
      })
      let jsonData = await fetchResult.json()
      jsonData.forEach(program => {
        if(program.status < 4) this.state = false
      })
    }
  },
  mounted(){
    this.getUserPrograms()
  }
}
</script>

<style scoped>
.container{
  padding: 0 24px;
  max-width: 1024px;
  margin: 0 auto;
}

.headContent{
  margin: 16px auto;
  padding: 16px;
  border-radius: 8px;
  background-color: aqua;
}

.mainContent{
  display: flex;
  margin: 16px auto;
  height: 85vh;
}

.leftContent{
  /* display: inline-block; */
  flex: 40;
  overflow-y: scroll;
  margin-right: 6px;
  /* width: 30%; */
  /* border-radius: 8px; */
  /* background-color: red; */
}

/* .splitter{ */
  /* display: inline-block; */
  /* width: 3%; */
  /* flex: 3; */
/* } */

.rightContent{
  /* display: inline-block; */
  border: 1px solid #42b983;
  flex: 60;
  margin-left: 6px;
  /* width: 65%; */
  border-radius: 8px;
  padding: 16px 48px;
  background-color: #fff;
  overflow-y: scroll;
  /* height: 100px; */
}

.btn-danger, .btn-success{
  margin: 0 4px;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
	outline: none;
  background-color: #fff;
}

.btn-danger:hover, .btn-success:hover{
  color: #fff;
}

.btn-danger:hover{
  background-color: firebrick;
}

.btn-success:hover{
  background-color: #42b983;
}

.btn-success{
  color: #42b983;
  border: 1px solid #42b983;
}

.btn-danger .material-icons, .btn-success .material-icons{
  vertical-align: middle;
}

::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}

@media screen and (max-width: 600px) {
  .mainContent{
    height: 82vh;
  }
  .container{
    padding: 0 12px;
  }
  .rightContent{
    padding: 0 16px;
    display: none;
  }
  .leftContent{
    width: 100%;
  }
}
</style>