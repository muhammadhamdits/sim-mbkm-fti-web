<template>
  <StudentProgramList @statusChange="updateStatus" :programsData="programsData" v-if="status === 'List'"></StudentProgramList>
  <StudentProgramDetail @statusChange="updateStatus" :programData="programData" v-else></StudentProgramDetail>
  <Modal @closeModal="closeModal" v-if="showModal">
    <h3>{{ modalMessage }}</h3>
  </Modal>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import StudentProgramList from '@/components/StudentProgramList.vue'
import StudentProgramDetail from '@/components/StudentProgramDetail.vue'
import Modal from '@/components/Modal.vue'
import { checkAuth, getCookie } from '../../utils/function'

export default {
  name: 'Program',
  components: {
    StudentProgramList,
    StudentProgramDetail,
    Modal
  },
  emits: ['statusChange'],
  setup(){
    const status = ref('List')
    const programsData = ref([])
    const programData = ref({})
    const jwt = getCookie('jwt')
    const showModal = ref(false)
    const modalMessage = ref('')

    const getProgramsData = async () => {
      let authData = await checkAuth({ jwt })
      let result = await fetch(`${process.env.VUE_APP_API_URI}/student/${authData.id}/program`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          jwt
        }
      })
      let jsonData = await result.json()
      // console.log(jsonData)
      programsData.value = jsonData
    }

    const updateStatus = async (state, data = {}, data2 = {}) => {
      if(state === 'Detail') programData.value = data
      else if(state === 'Add'){
        showModal.value = true
        modalMessage.value = data2.success
        status.value = 'List'
        await getProgramsData()
        let tempProgramsData = programsData.value
        let tempProgramData = tempProgramsData.find(tempProgramData => tempProgramData.program_id === data.program_id && tempProgramData.student_id === data.student_id)
        programData.value = tempProgramData
      }
      status.value = state
    }

    const closeModal = () => {
      showModal.value = false
    }

    onMounted(() => {
      getProgramsData()
      document.title = 'Home - SIM MBKM FTI'
    })

    return { status, programsData, programData, showModal, modalMessage, updateStatus, closeModal }
  }
}
</script>

<style>

</style>